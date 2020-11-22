import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Add from "../../components/Add";
import List from "../../components/List";
import { TodoList, TodoStatus, TodoItem } from "../../@types/todo";
import "./index.scss";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PageProps {};

interface PageState {
  list: TodoList;
}

export default class Index extends Component<PageProps, PageState> {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.state = {
      list: [],
    };
  }

  componentWillMount() {
    const db = Taro.cloud.database();
    db.collection('list').get().then(({ data }) => {
      const list = data as TodoList;
      this.setState({ list });
    });
  }

  config: Config = {
    navigationBarTitleText: "TODO LIST",
  };

  add(item: TodoItem) {
    const { list } = this.state;
    this.setState({
      list: list.concat(item)
    })
  }

  changeStatus(id: string, status: TodoStatus) {
    const { list } = this.state;
    const item = list.find(it => it._id === id);
    if(item) {
      item.status = status;
      this.setState({
        list: [...list]
      })
    }
  }

  render() {
    const { list } = this.state;
    return (
      <View className='index'>
        <Add add={this.add} />
        <List list={list} changeStatus={this.changeStatus} />
      </View>
    );
  }
}
