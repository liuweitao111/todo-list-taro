import Taro, { useState } from '@tarojs/taro';
import { AtInput, AtButton } from 'taro-ui';
import { TodoItem } from '../../@types/todo';

type IProps = {
  add: (value: TodoItem) => void;
};

export default function Add(props: IProps) {
  const { add } = props;
  const [text, setText] = useState('');
  const handleChange = value => setText(value)
  const handleSubmit = () => {
    const item: TodoItem = {
      _id: '',
      name: text,
      status: 'unComplete',
    }
    const db = Taro.cloud.database();
    db.collection('list').add({
      data: item,
      success: res => {
        item._id = res._id;
        add(item);
        setText("");
        Taro.showToast({
          icon: 'success',
          title: '添加成功'
        });
      }
    })
  };
  return (
    <AtInput
      value={text}
      name='name'
      border
      onChange={handleChange}
      placeholder='请输入要做的事情'
    >
      <AtButton
        size='small'
        type='primary'
        onClick={handleSubmit}
      >
        提交
      </AtButton>
    </AtInput>
  );
}