import React from 'react';
import ReactDOM from 'react-dom';
import { AppKitProvider } from './components/AppKitProvider';
import ButtonW3M from './components/AppWithEthers';

const App: React.FC = () => <><h1>App Works!

    {/* <AppKitProvider>
        TEST
        <w3m-button />

    </AppKitProvider> */}
</h1>

<ButtonW3M />

    
    </>;

ReactDOM.render(<App />, document.getElementById('root'));
