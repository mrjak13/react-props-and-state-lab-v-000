import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (newType) => {
    this.setState({
      filters: {
        type: newType
      }
    })
  }

  setUrl = () => {
    if (`${this.state.filters.type}` === 'all') {
      return '/api/pets'
    } else {
      return `/api/pets?type=${this.state.filters.type}`
    }
  }

  onFindPetsClick = () => {

    fetch(this.setUrl(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(filteredPets => this.setState({
      pets: filteredPets
    }))
  }



  onAdopPet = (id) => {
    this.setState({
      pets: this.state.pets.map(pet => {
        if (pet.id === id) {
          pet.isAdopted = true
          return pet
        } else {
          return pet
        }
      })
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdopPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
