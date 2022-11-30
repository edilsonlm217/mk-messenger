import React from 'react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

const Component: React.FC = () => {
    return (
        <Dimmer active>
            <Loader>Carregando</Loader>
        </Dimmer>
    );
}

export default Component;