class TodoStore extends EventTarget {
	constructor(localStorageKey) {
		super();
		this.localStorageKey = localStorageKey;
		this._readStorage();
		// handle todos edited in another window
		window.addEventListener(
			"storage",
			() => {
				this._readStorage();
				this._save();
			},
			false
		);
		// GETTER methods
		this.get = (id) => this.todos.find((todo) => todo.id === id);
		this.isAllCompleted = () => this.todos.every((todo) => todo.completed);
		this.hasCompleted = () => this.todos.some((todo) => todo.completed);
		this.all = (filter) =>
			filter === "active"
				? this.todos.filter((todo) => !todo.completed)
				: filter === "completed"
				? this.todos.filter((todo) => todo.completed)
				: this.todos;
	}
	_readStorage() {
		this.todos = JSON.parse(window.localStorage.getItem(this.localStorageKey) || "[]");
	}
	_save() {
		window.localStorage.setItem(
			this.localStorageKey,
			JSON.stringify(this.todos)
		);
		this.dispatchEvent(new CustomEvent("save"));
	}
	// MUTATE methods
	add(todo) {
		this.todos.push({
			title: todo.title,
			completed: false,
			id: "id_" + Date.now(),
		});
		this._save();
	}
	remove({ id }) {
		this.todos = this.todos.filter((todo) => todo.id !== id);
		this._save();
	}
	toggle({ id }) {
		this.todos = this.todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		this._save();
	}
	clearCompleted() {
		this.todos = this.todos.filter((todo) => !todo.completed);
		this._save();
	}
	update(todo) {
		this.todos = this.todos.map((t) => (t.id === todo.id ? todo : t));
		this._save();
	}
	toggleAll() {
		const completed = !this.hasCompleted() || !this.isAllCompleted();
		this.todos = this.todos.map((todo) => ({ ...todo, completed }));
		this._save();
	}
	revert() {
		this._save();
	}
}

const Todos = new TodoStore("todo-modern-vanillajs");

const App = {
	$: {
		input: document.querySelector('[data-todo="new"]'),
		toggleAll: document.querySelector('[data-todo="toggle-all"]'),
		clear: document.querySelector('[data-todo="clear-completed"]'),
		list: document.querySelector('[data-todo="list"]'),
		showMain(show) {
			document.querySelector('[data-todo="main"]').style.display = show ? "block" : "none";
		},
		showFooter(show) {
			document.querySelector('[data-todo="footer"]').style.display = show ? "block" : "none";
		},
		showClear(show) {
			App.$.clear.style.display = show ? "block" : "none";
		},
		setActiveFilter(filter) {
			document.querySelectorAll(`[data-todo="filters"] a`).forEach((el) => {
				if (el.matches(`[href="#/${filter}"]`)) {
					el.classList.add("selected");
				} else {
					el.classList.remove("selected");
				}
			});
		},
		displayCount(count) {
			replaceHTML(
				document.querySelector('[data-todo="count"]'),
				`
				<strong>${count}</strong>
				${count === 1 ? "item" : "items"} left
			`
			);
		},
	},
	init() {
		Todos.addEventListener("save", App.render);
		App.filter = getURLHash();
		window.addEventListener("hashchange", () => {
			App.filter = getURLHash();
			App.render();
		});
		App.$.input.addEventListener("keyup", (e) => {
			if (e.key === "Enter" && e.target.value.length) {
				Todos.add({
					title: e.target.value,
					completed: false,
					id: "id_" + Date.now(),
				});
				App.$.input.value = "";
			}
		});
		App.$.toggleAll.addEventListener("click", (e) => {
			Todos.toggleAll();
		});
		App.$.clear.addEventListener("click", (e) => {
			Todos.clearCompleted();
		});
		App.bindTodoEvents();
		App.render();
	},
	todoEvent(event, selector, handler) {
		delegate(App.$.list, selector, event, (e) => {
			let $el = e.target.closest("[data-id]");
			handler(Todos.get($el.dataset.id), $el, e);
		});
	},
	bindTodoEvents() {
		App.todoEvent("click", '[data-todo="destroy"]', (todo) => Todos.remove(todo));
		App.todoEvent("click", '[data-todo="toggle"]', (todo) => Todos.toggle(todo));
		App.todoEvent("dblclick", '[data-todo="label"]', (_, $li) => {
			$li.classList.add("editing");
			$li.querySelector('[data-todo="edit"]').focus();
		});
		App.todoEvent("keyup", '[data-todo="edit"]', (todo, $li, e) => {
			let $input = $li.querySelector('[data-todo="edit"]');
			if (e.key === "Enter" && $input.value) {
				$li.classList.remove("editing");
				Todos.update({ ...todo, title: $input.value });
			}
			if (e.key === "Escape") {
				document.activeElement.blur();
			}
		});
		App.todoEvent("focusout", '[data-todo="edit"]', (todo, $li, e) => {
			if ($li.classList.contains("editing")) {
				App.render();
			}
		});
	},
	createTodoItem(todo) {
		const li = document.createElement("li");
		li.dataset.id = todo.id;
		if (todo.completed) {
			li.classList.add("completed");
		}
		insertHTML(
			li,
			`
			<div class="view">
				<input data-todo="toggle" class="toggle" type="checkbox" ${todo.completed ? "checked" : ""}>
				<label data-todo="label"></label>
				<button class="destroy" data-todo="destroy"></button>
			</div>
			<input class="edit" data-todo="edit">
		`
		);
		li.querySelector('[data-todo="label"]').textContent = todo.title;
		li.querySelector('[data-todo="edit"]').value = todo.title;
		return li;
	},
	render() {
		const count = Todos.all().length;
		App.$.setActiveFilter(App.filter);
		App.$.list.replaceChildren(...Todos.all(App.filter).map((todo) => App.createTodoItem(todo)));
		App.$.showMain(count);
		App.$.showFooter(count);
		App.$.showClear(Todos.hasCompleted());
		App.$.toggleAll.checked = Todos.isAllCompleted();
		App.$.displayCount(Todos.all("active").length);
	},
};

App.init();

function getURLHash() {return document.location.hash.replace(/^#\//, "");}

function delegate(el, selector, event, handler){
	el.addEventListener(event, (e) => {
		if (e.target.matches(selector)) handler(e, el);
	});
};

function insertHTML(el, html) {
	return el.insertAdjacentHTML("afterbegin", html)
}

function replaceHTML(el, html) {
	el.replaceChildren()
	insertHTML(el, html)
}