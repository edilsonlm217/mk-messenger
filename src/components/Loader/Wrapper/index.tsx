import React, { Component } from "react"
import { Dimmer, Loader } from 'semantic-ui-react';

export class LoaderWrapper extends Component {
    state = {
        isLoading: false
    }

    open = () => {
        this.setState({ isLoading: true })
    }

    close = () => {
        this.setState({ isLoading: false })
    }

    render() {
        const { isLoading } = this.state;
        return (
            <Dimmer active={isLoading}>
                <Loader>Carregando</Loader>
            </Dimmer>
        );
    }
}
