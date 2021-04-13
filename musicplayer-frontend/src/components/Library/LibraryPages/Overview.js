import React from 'react'
import axios from 'axios'

import SimpleAudioContainer from '../containers/SimpleAudioContainer'

import "./Overview.css"

class Overview extends React.Component
{
    

    componentDidMount()
    {

    }

    renderSimpleAudioContainer() 
    {
        return(
            <>
            <SimpleAudioContainer></SimpleAudioContainer>
            <SimpleAudioContainer></SimpleAudioContainer>
            <SimpleAudioContainer></SimpleAudioContainer>
            <SimpleAudioContainer></SimpleAudioContainer>
            <SimpleAudioContainer></SimpleAudioContainer>
            <SimpleAudioContainer></SimpleAudioContainer>
            <SimpleAudioContainer></SimpleAudioContainer>
            <SimpleAudioContainer></SimpleAudioContainer>
            <SimpleAudioContainer></SimpleAudioContainer>
            <SimpleAudioContainer></SimpleAudioContainer>
            </>
        )
    }

    render()
    {
        return(<div>
            <div>
                <h2 className="sub_titles" onClick={() => this.props.updateCurrentPage("tracks")}>Tracks</h2>
                <div className="wrapper pb-4">
                    <SimpleAudioContainer></SimpleAudioContainer>
                    <SimpleAudioContainer></SimpleAudioContainer>
                    <SimpleAudioContainer></SimpleAudioContainer>
                    <SimpleAudioContainer></SimpleAudioContainer>
                    <SimpleAudioContainer></SimpleAudioContainer>
                    <SimpleAudioContainer></SimpleAudioContainer>
                    <SimpleAudioContainer></SimpleAudioContainer>
                    <SimpleAudioContainer></SimpleAudioContainer>
                    <SimpleAudioContainer></SimpleAudioContainer>
                    <SimpleAudioContainer></SimpleAudioContainer>
                </div>
            </div>
        </div>)
    }
}


export default Overview