---
title: react with JSX for {if…else…}
date: 2016-05-30 15:13
---

在react中用jsx渲染dom的时候经常会遇到if条件判断，然而在jsx中竟是不允许if条件判断的。以下有几种判断方式，可以根据自己的应用场景，挑选适合的。

方案一：

```javascript
class HelloMessage extends React.Component {
  render (){
    let userMessage;
    if (this.props.loggedIn) {
      userMessage = (
        <span>
          <h2>{ `Welcome Back ${ this.props.name }` }</h2>
          <p>You can visit settings to reset your password</p>
        </span>
      )
    } else {
      userMessage = (
        <h2>Hey man! Sign in to see this section</h2>
      )
    }
    return(
      <div>
        <h1>My Super React App</h1>
        { userMessage }
      </div>
    )
  }
}
```
<!--more-->
方案二：

```javascript
class HelloMessage extends React.Component {

  renderUserMessage(){
    if (this.props.loggedIn) {
      return (
        <span>
          <h2>{ `Welcome Back ${ this.props.name }` }</h2>
          <p>You can visit settings to reset your password</p>
        </span>
      );
    } else {
      return (
        <h2>Hey man! Log in to see this section</h2>
      );
    }
  }

  render (){        
    return(
      <div>
        <h1>My Super React App</h1>
        { this.renderUserMessage() }
      </div>
    )
  }
}
```

方案三：

```javascript
class HelloMessage extends React.Component {
  render (){        
    return(
      <div>
        <h1>
          { this.props.loggedIn ?  'You are logged In' : 'You are not logged In' }
        </h1>
      </div>
    )
  }
```

方案四：

```javascript
class HelloMessage extends React.Component {
  render (){
    return(
      <div>
        <h1>My Super React App</h1>
        { this.props.loggedIn ?
            <span>
              <h2>{ `Welcome Back ${ this.props.name }` }</h2>
              <p>You can visit settings to reset your password</p>
            </span>
            :
            <h2>Hey man! Log in to see this section</h2>
        }
      </div>
    )
  }
}
```

方案五：

```javascript
// 拆分成小函数
class HelloMessage extends React.Component {
  renderLogin() { // 如果这里有多行，推荐用这种方法
    const {loggedIn, name} = this.props;
    if (!loggedIn) return;
    
    return (<span>
      <h2>Welcome Back {name}</h2>
      <p>You can visit settings to reset your password</p>
    </span>);
  }

  render (){
    return(
      <div>
        <h1>My Super React App</h1>
        {this.renderLogin()}
      </div>
    );
  }
}
```
综上：短小的字段判断只能用三元表达式，如果是大块的元素都需要区分，就要利用变量了。