Vue.component('task', {
    props: {
        blocknote_data: {
            type: Object,
            default() {
                return {}
            }
        },
        blocknotes: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            taskTitle: '',
            newTaskTitle: '',
            newBlockTitle: '',
        }
    },
    methods: {
        blocknote_delete() {
            this.$emit ('blocknote_delete')
        },
        add_task() {
            this.blocknote_data.tasks.push({
                taskTitle: this.taskTitle,
                completed: false,
                isEdit: false,
            });
            this.taskTitle='';
            localStorage.local = JSON.stringify(this.blocknotes)
        },
        done_task() {
            this.blocknote_data.tasks = this.blocknote_data.tasks.map(task =>{{
                    task.completed = !task.completed;
                    localStorage.local = JSON.stringify(this.blocknotes)
                }
                return task;
            })
        },
        del_task(id) {
            this.blocknote_data.tasks.splice(id, 1)
            localStorage.local = JSON.stringify(this.blocknotes)
        },
        renameBlock(NewblockTitle) {
            this.newBlockTitle = NewblockTitle;
                if(this.blocknote_data.block_title === NewblockTitle){
                    this.blocknote_data.isEditBlock = !this.blocknote_data.isEditBlock
                }
                return this.blocknote_data;
        },
        editBlock(NewblockTitle){
                if(this.blocknote_data.block_title === NewblockTitle)
                    {this.blocknote_data.isEditBlock = !this.blocknote_data.isEditBlock
                        this.blocknote_data.block_title = this.newBlockTitle;
                        localStorage.local = JSON.stringify(this.blocknotes)}
                    return this.blocknote_data
        },
        rename(NewTitle){
            this.newTaskTitle = NewTitle;
            this.blocknote_data.tasks = this.blocknote_data.tasks.map(task =>{
                if(task.taskTitle === NewTitle){
                    task.isEdit = !task.isEdit;
                }
                return task;
            })
        },
        edit(NewTitle) {
            this.blocknote_data.tasks = this.blocknote_data.tasks.map(task => {
                if(task.taskTitle === NewTitle) {
                    task.isEdit = !task.isEdit;
                    task.taskTitle = this.newTaskTitle;
                    localStorage.local = JSON.stringify(this.blocknotes)
                }
                return task
            })
        }
    },
    template: `
            <div class="blocknote">
                <div>
                    <div class="blocknote__header">
                        <div>
                            <input class="edit_input" type="text" v-if="blocknote_data.isEditBlock" @keyup.enter="editBlock(blocknote_data.block_title)" v-model="newBlockTitle">
                            <h3 v-else class="blocknote__title">{{blocknote_data.block_title}}</h3>
                        </div>
                        <div>
                            <button @click="renameBlock(blocknote_data.block_title)" class="btn-edit">Изменить</button>
                            <button @click="blocknote_delete()" class="btn-delete2">Удалить</button>
                        </div>
                    </div>
                    <div v-for="(el, x) in blocknote_data.tasks" :key="x" class='task'>
                    <div>
                        <input class="edit_input" type="text" v-if="el.isEdit" @keyup.enter="edit(el.taskTitle)" v-model="newTaskTitle">
                        <h3 v-else :class="{'strike':el.completed}" class="task__title">{{el.taskTitle}}</h3>
                    </div>
                    <div>
                        <button @click="rename(el.taskTitle)" class="btn-delete">✏️</button>
                        <button @click="done_task()" class="btn-delete">✔️</button>
                        <button @click="del_task(x)" class="btn-delete">❌</button>
                    </div>
                </div>
                    <div class="add_task">
                    <div class="add_task__input">
                        <input type="text" @keyup.enter="add_task()" v-model="taskTitle" placeholder="Заголовок">
                    </div>
                    <button @click="add_task()" class="add_task__btn">Добавить</button>
                </div>
                </div>
                
            </div>
    `
})

let app = new Vue({
    el: '#app',
    data: {
        block_title: '',
        blocknotes: [],
    },
    mounted() {
        // localStorage.clear();
        if(localStorage.local) {
            this.blocknotes = typeof JSON.parse(localStorage.local) === "number" ? [JSON.parse(localStorage.local)] : JSON.parse(localStorage.local)
        }
    },
    methods: {
       add_blocknote() {
            this.blocknotes.push({
                block_title: this.block_title,
                isEditBlock: false,
                tasks: [],
            });
            this.block_title = '';
            localStorage.local = JSON.stringify(this.blocknotes)
       },
       delete_blocknote(id) {
        app.blocknotes.splice(id, 1);
        localStorage.local = JSON.stringify(this.blocknotes)
       },
    },
})
