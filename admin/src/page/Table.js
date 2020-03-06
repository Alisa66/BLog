import React from 'react'
import {Table} from "antd";

const { Column } = Table;
function table() {

  const data = [
        {
            key: '1',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        },
    ];
  return(
      <div>
          <Table dataSource={data}>
              <Column title="Age" dataIndex="age"/>
              <Column title="Address" dataIndex="address" key="address" />
              <Column title="Action" key="action" render={(text, record) => (
              <span>
                  <a style={{ marginRight: 16 }}>Invite</a>
                  <a>Delete</a>
             </span>
                  )}
              />
          </Table>
      </div>
  )
}

export default table