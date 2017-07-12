三种创建component方法：
1.  var MyComponent = React.createClass({
                render() {
                    return <div>
                        <h1>{this.props.text}</h1>
                        <p>{this.props.children}</p>
                    </div>
                }
            })
 2.   class MyComponent extends React.Component {
                render() {
                    return <div>
                        <h1>{this.props.text}</h1>
                        <p>{this.props.children}</p>
                    </div>
                }
            }
3.  const MyComponent = () => {
                return <div>
                       <h1>{this.props.text}</h1>
                        <p>{this.props.children}</p>
                    </div>
            }

渲染
 ReactDOM.render(<MyComponent />,
                document.getElementById('react-container'))
多个渲染
ReactDOM.render(<div>
<MyComponnet text=“1”>This is message 1</MyComponent>
<MyComponnet text=“2”>This is message 2</MyComponent>
<MyComponnet text=“3”>This is message 3</MyComponent>
                </div>,
                document.getElementById('react-container'))

<div id='react-container'></div>
<script type="text/babel">
    var Note =React.createClass({
    edit(){
        alert("Editing Note")
    },
    remove(){
        alert("Removing Note")
    },
    render(){
        return (
            <div className="note">
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}>EDIT</button>
                    <button onClick={this.remove}>X</button>
                </span>
            </div>
        )
    }
    })
    ReactDOM.render(<Note>Hello World</Note>,document.getElementById('react-container'))
</script>