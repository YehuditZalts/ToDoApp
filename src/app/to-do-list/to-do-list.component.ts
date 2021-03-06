import { Component, OnInit } from '@angular/core';
import { ITodoItem } from 'models/ITodoItem';
import { AppsyncService } from '../appsync.service';
import { TodoItemInput } from '../types/TodoItemInput';
import { updateTodo, deleteTodo } from '../../graphql/mutations';
import { listTodos } from '../../graphql/queries';
import gql from 'graphql-tag';
import { ApixuService } from '../apixu.service';
import { API, graphqlOperation } from 'aws-amplify';
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  constructor(private appsync: AppsyncService, private apixuService: ApixuService) { }

  private inEdit = false;
  allTodos: any;
  listFilter = 'dfd';
  Title = 'hello';
  title = 'sdf';
  Description = 'sleep and sleep';

  description = 'j';

  cities: String[] = ['Beit Shemesh', 'Jerusalem', 'Lod'];
  todos: Array<{item: ITodoItem, isEdit: boolean}> = [{item: { id: "16", name: 'sleep', body: 'tomorrow', city: 'jerusalem', completed: false,temperature: '12' }, isEdit: false},
{item: { id: "164", name: 'smile', body: 'today', city: 'beit Shemesh', completed: true ,temperature: '22'}, isEdit: false}];



// todoDisplay = [...this.todos];


 async ngOnInit() {
    // this.appsync.hc().then((client: any) => {
    //   const observable = client.watchQuery({
    //     query: gql(listTodos),
    //     fetchPolicy: 'cache-and-network'
    //   });
    //   observable.subscribe((data: any) => {
    //     this.allTodos = data?.allTodos?.items;

    //   });
    //   this.allTodos.forEach((todo:any) => {
    //     if (todo.city) {
    //       this.apixuService.getWeather(todo.city).subscribe((data:any) => {
    //         todo.temperature =data.current.temperature
    //      })
    //     }
    //   });

    // });

    // const result = await API.graphql(listTodos)

    // this.todos = this.allTodos


  }

  get InEdit(): boolean {
    return this.inEdit;
  }

  async Delete(id: any) {

    alert("task is deleted");
    await API.graphql(graphqlOperation(deleteTodo, {input:{ID: id}}));
  }

  async Save(oneTodo: ITodoItem) {
    const todo: ITodoItem = new TodoItemInput();
    todo.completed = false;
    todo.name = oneTodo.name;
    todo.body = oneTodo.body;
    todo.city = oneTodo.city
    todo.id = oneTodo.id;

    await API.graphql(graphqlOperation(updateTodo, {input: todo}));
    this.Edit(oneTodo);
  }

  Cancel(todo: any) {
  //  this.todos[indexOfelement].isEdit = false;
  }
  
  Edit(oneTodo: any) {
    const todoIndex = this.todos.findIndex(todo => todo.item.id === oneTodo.id)
    this.todos[todoIndex].isEdit = false;
    this.todos[todoIndex].item.body = oneTodo.item.body;
    this.todos[todoIndex].item.city = oneTodo.item.city;
    this.todos[todoIndex].item.name = oneTodo.item.name;
  }
}