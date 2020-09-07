import React, { Component } from 'react';

import styles from './CreateBoard.css';

import FormElements from './../../components/FormElements/FormElements';
import Axios from 'axios';

class CreateBoard extends Component {
    constructor(props) {
        super(props);
        this.boardNameRef = React.createRef();
        this.membersRef = React.createRef();
        this.boardTypeRef = React.createRef();
    }

    state = {
        formElements : [
            {
                type: 'text',
                placeholder: 'e.g. Agile Sprint Board',
                label: 'Enter a name for your board',
                id: 'name',
                value: null
            },
            {
                type: 'text',
                placeholder: 'Add your team (separated by commas)',
                label: 'Add your team members',
                id: 'team',
                value: null
            },
            {
                type: 'text',
                placeholder: 'e.g. Design UX',
                label: 'Enter the type of your board',
                id: 'type',
                value: null
            }
        ],
        allBoards: [],
        allBoardsData: { }
    }

    componentDidMount = () => {
        Axios.get('https://pro-organizer-f83b5.firebaseio.com/boardData/-LuM4blPg67eyvzgAzwn/allBoards.json')
            .then(response => {
                this.setState({
                    allBoards: [...response.data]
                })
            })
            .catch(error => {console.log(error)});

        Axios.get('https://pro-organizer-f83b5.firebaseio.com/boardData/-LuM4blPg67eyvzgAzwn/boards.json')
            .then(response => {
                this.setState({
                    allBoardsData: response.data
                })
            })
            .catch(error => {console.log(error)});
    }

    createBoardHandler = () => {
        // debugger;
        let boards = [...this.state.allBoards];
        let boardsData = {...this.state.allBoardsData};
        let formElements = {...this.state.formElements};
        let id = 'board' + (boards.length + 1);
        let newBoard = {
            id: id
        };
        let newBoardData = {
            cards: [],
            columns: [],
            id: id,
            members: [],
            name: null
        }

        for(let element in formElements) {
            let formElement = formElements[element];
            if(formElement.id === 'team') {
                let members = formElement.value.map((member, counter) => {
                    let obj = {};
                    obj.id = counter;
                    obj.name = member.trim();
                    obj.initials = member.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'');
                    return obj;
                })
                newBoardData.members = members;
            } else {
                newBoard[formElement.id] = formElement.value;
            }
        }
        newBoardData.name = newBoard.name;

        boards.push(newBoard);
        boardsData[id] = newBoardData;
        Axios.put('https://pro-organizer-f83b5.firebaseio.com/boardData/-LuM4blPg67eyvzgAzwn/allBoards.json', boards)
            .then(response => {
                Axios.put('https://pro-organizer-f83b5.firebaseio.com/boardData/-LuM4blPg67eyvzgAzwn/boards.json', boardsData)
                    .then(response => {
                        this.props.history.push('/');
                    })
                .catch(error => {console.log('Boards.json error ', error);})
            })
            .catch(error => {console.log('allBoards.json error', error);})
    }

    changeHandler = (id, value) => {
        let formElements = [...this.state.formElements];
        for(let element in formElements) {
            if(formElements[element].id === id) {
                if(id === 'team') {
                    value = value.length > 0 ? value.split(',') : null;
                }
                formElements[element].value = value;
            }
        }
        this.setState({
            formElements: formElements
        })
    }


    render() {
        let formElements = this.state.formElements.map(element => {
            return <FormElements element={element} key={element.id} changed={this.changeHandler} />
        })

        return (
            <div className={styles.CreateBoard}>
                <span className={styles.Title}>Create a Board</span>
                <div className={styles.BoardForm}>
                    {formElements}
                </div>
                <button id= 'CreateBoard' className={styles.CreateButton} onClick={this.createBoardHandler}>Create</button>
            </div>
        )
    }
}

export default CreateBoard;
