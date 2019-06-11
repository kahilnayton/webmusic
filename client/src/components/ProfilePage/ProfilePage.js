// import React, { Component } from 'react';
// import { fetchSound, createSound, deleteSound } from '../../service/index'
// import { Card, Icon, Button, Modal, Form, Divider, Grid, Segment, Statistic } from 'semantic-ui-react'





// class ProfilePage extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       allSound: {
//         sound: "mail",
//         setting: 60
//       },
//     }
//   }

//   componentDidMount = async () => {
//     await this.props.findToken();
//     await this.setSound()
//     await this.getAll();
//   }

//   setSound = async () => {
//     const sound = await fetchSound(this.props.user)

//   }

//   showSounds = () => {
//     const { allSound } = this.state;
//     const myCards = allSound.map(sound => {
//       const nameString = sound.name;
//       return (<Card key={sound.id} className="my-cards">
//         <Card.Content extra>
//           <Button onClick={() => this.deleteSoundHandle(this.props.user, sound.id)} icon="trash" className="trash-button" />
//         </Card.Content>
//         <Card.Content className="feed-right">
//           <Card.Description> {sound.name} {sound.setting} Effect.</Card.Description>
//         </Card.Content>
//       </Card>)
//     })
//     return myCards;
//   }

//   totalCal = () => {
//     const { allSound } = this.state;
//     let total = 0
//     allSound.map(sound => {
//       total += sound.name
//     })
//     return total;
//   }



//   getAll = async () => {
//     const allSound = await fetchSound(this.props.user)
//     this.setState({
//       allSound: allSound,
//       getSound: true
//     });
//   }


//   deleteSoundHandler = async (user, sound) => {
//     console.log(this.props.user, this.state.name)
//     await deleteSound(user, sound)
//     this.getAll()
//   }


//   render() {
//     return (
//       <div className="display-contain-ex">
//         <div className="shade-ex">
//           <div className="display-left">
//             <Segment>
//               <Card.Group stackable itemsPerRow={2} className="card-group">
//                 {this.showSounds()}
//               </Card.Group>
//             </Segment>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }


// export default ProfilePage