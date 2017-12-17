import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const Home = () => (
    <h1>This Is Home Page</h1>
)

class Hello extends React.Component {

    componentWillMount() {
        console.log('component will mount');
    }
    componentWillUnmount() {
        console.log('component will unmount');
    }
    render() {
        return (
            <h1>Hello!</h1>
        )
    }
}

// About Route
// AboutRoute是一个自定义的Route组件,使用了render
class AboutRoute extends React.Component {
    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={(props) => (
                    <Component {...props} />
                )}
            />
        )
    }
}

//About Car Component
class AboutCar extends React.Component {

    componentWillMount() {
        console.log('AboutCar component will mount');
    }
    componentWillUnmount() {
        console.log('AboutCar component will unmount');
    }
    render() {
        console.log('About Car!');
        return (
            <div>
                <h1>About Car!</h1>
                <p> Lamborghini</p>
            </div>
        )
    }
}

//About Animal Component
class AboutAnimal extends React.Component {

    componentWillMount() {
        console.log('AboutAnimal component will mount');
    }
    componentWillUnmount() {
        console.log('AboutAnimal component will unmount');
    }
    render() {
        console.log('About Animal!');
        return (
            <div>
                <h1>About Animal!</h1>
                <p> Pig </p>
            </div>
        )
    }
}

const MenuLink = ({ to, activeOnlyWhenExact, label }) => (
    <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (
            <div>
                {match ? '>' : ''}<Link to={to}>{label}</Link>
            </div>
        )}
    />
)

const App = () => (
    <Router>
        <div>
            <ul>
                {
                /* 
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/Hello'>Hello('component' props render)</Link></li>
                <li><Link to='/AboutCar'>About('render' props render)</Link></li>
                <li><Link to='/AboutAnimal'>About('render' props render)</Link></li> 
                */
                }
                <li><MenuLink to='/' activeOnlyWhenExact={true} label='Home'/></li>
                <li><MenuLink to='/Hello' label='Hello(component props render)'/></li>
                <li><MenuLink to='/AboutCar' label='AboutCar(render props render)'/></li>
                <li><MenuLink to='/AboutAnimal' label='AboutAnimal(render props render)'/></li> 

            </ul>
            <Route exact path='/' component={Home} />
            <Route path='/Hello' component={Hello} />
            <AboutRoute path='/AboutCar' component={AboutCar} />
            <AboutRoute path='/AboutAnimal' component={AboutAnimal} />
        </div>
    </Router>
)
// 1. component 属性也可以是 inline function

// 3. <Route path='/Hello' component={<Hello/>} /> // 报错:Element type is invalid.
//    <Route path='/Hello' component={ Hello } /> // correct! 并且会向下默认传递参数（{match,location,history}）

// 4. ‘3’ 中是对component将组件直接传入，因为文档中已说明，when you use `component` prop, 
//    the router will uses `React.createElement` to create a new `React Element` from the given component
//    如果使用`inline function` ↓
//      <Route path='/Hello' component={() => <Hello/> } /> // correct
//      <Route path='/Hello' component={() => Hello } /> //error ,因为会告诉你`Function are not valid as a React child`

// 5. '3'和'4' 分别是向`component`属性中传入了 对象 和 内联函数, 区别是:前一种会默认传参,后一种不会.
//      如果想用内联函数传参--><Route path='/Hello' component={(props)=><Hello {...props}/> } />

// 6. 由于component 表示每次路由匹配时都会重新创建组件(移除现有组件,挂载新创建的组件),所以不建议使用内联函数,而是直接传入组件对象.

// 7. component与render的区别就是前者会每次创建新组件,后者会更新现有组件.

// 8. component会覆盖render,所以不要同时用.

// 9. children和render都是更新现有的组件，唯一不同是无论path与location是否匹配都会去调用children prop.
//    如果没有匹配上,则传入的参数match为null.


//10. component 覆盖 render, render 覆盖 children .

export { App };