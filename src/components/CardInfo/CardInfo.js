import React, { Component } from 'react';
import styles from './CardInfo.css';
import columnCardStyles from './../BoardColumn/ColumnCards/ColumnCard/ColumnCard.css';
import createBoardStyles from './../../pages/CreateBoard/CreateBoard.css';

import Members from './../Members/Members';

class CardInfo extends Component {
    render() {
        let members = null;

        if(this.props.data.card[0].members !== undefined && this.props.data.card[0].members !== null) {
            members = this.props.data.card[0].members !== undefined && this.props.data.card[0].members.map(member => {
                return <Members member={member} key={member} />
            })
        }
        let date = 'Deadline not set';
        if(this.props.data.card[0].due_date !== undefined && this.props.data.card[0].due_date !== null) {
            let receivedDate = new Date(this.props.data.card[0].due_date);
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            date = receivedDate.getDate() + ' ' + months[receivedDate.getMonth()] + ', ' +  receivedDate.getFullYear();
        }
        return (
            <div className={styles.CardInfo}>
                <div className={styles.Header}>
                    <div className={styles.TitleContainer}>
                        <p className={styles.CardInfoTitle}>{this.props.data.card[0].title}</p>
                        <p className={styles.CardInfoSubTitle}>in {this.props.data.column[0].name}</p>
                    </div>
                    <div>
                        <button className={createBoardStyles.CreateButton} onClick={() => this.props.editCard(this.props.data.column[0].id)}>Edit</button>
                        <button className={createBoardStyles.CreateButton} style={{backgroundColor: 'red'}} onClick={() => this.props.archiveCard(this.props.data.card[0])}>Archive</button>
                    </div>
                </div>
                <div className={styles.Container}>
                    <label className={styles.Label}>Description</label>
                    <div className={styles.Description}>{this.props.data.card[0].description}</div>
                </div>
                <div className={styles.Container}>
                    <label className={styles.Label}>Members</label>
                    <div className={columnCardStyles.MembersContainer}>
                        { members }
                    </div>
                </div>
                <div className={styles.Container}>
                    <label className={styles.Label}>Due Date</label>
                    <div className={styles.Description}>{ date }</div>
                </div>
            </div>
        )
    }
}

export default CardInfo;
