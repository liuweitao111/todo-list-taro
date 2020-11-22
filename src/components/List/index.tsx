import Taro, { useState } from "@tarojs/taro";
import { AtTabs, AtTabsPane, AtList, AtListItem } from "taro-ui";
import { TodoList, TodoStatus } from "../../@types/todo";

type IProps = {
  list: TodoList;
  changeStatus: (id: string, status: TodoStatus) => void;
};

export default function List(props: IProps) {
  const { list = [], changeStatus } = props;
  const [current, setCurrent] = useState(0);
  const tabList = [
    {
      title: "全部",
      list,
    },
    {
      title: "已完成",
      list: list.filter((item) => item.status === "complete"),
    },
    {
      title: "未完成",
      list: list.filter((item) => item.status === "unComplete"),
    },
  ];
  const handleChange = (id: string, completed: boolean) => {
    const status = completed ? "complete" : "unComplete";
    const db = Taro.cloud.database();
    db.collection('list').doc(id).update({
      data: { status }
    }).then(() => {
      changeStatus(id, status);
    })
  };
  return (
    <AtTabs tabList={tabList} current={current} onClick={setCurrent}>
      {tabList.map((tab, idx) => {
        return (
          <AtTabsPane current={current} index={idx} key={tab.title}>
            <AtList>
              {tab.list.map((item, i) => {
                const title = `${i + 1}、${item.name}`;
                return (
                  <AtListItem
                    title={title}
                    key={item._id}
                    isSwitch
                    switchIsCheck={item.status === "complete"}
                    onSwitchChange={e => handleChange(item._id, e.target.value)}
                  />
                );
              })}
            </AtList>
          </AtTabsPane>
        );
      })}
    </AtTabs>
  );
}
