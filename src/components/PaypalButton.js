import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class PaypalButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showButton: false,
        };
        window.React = React;
        window.ReactDOM = ReactDOM;
    }

    componentDidMount() {
        const {isScriptLoaded, isScriptLoadSucceed} = this.props;
        if (isScriptLoaded && isScriptLoadSucceed) {
            this.setState({ showButton: true });
        }
    }

    componentDidUpdate(prevProps){
        const { isScriptLoadSucceed} = this.props;
      
        //const isLoadedButWasntLoadedBefore = !this.state.showButton && !this.props.isScriptLoaded && isScriptLoaded;
        if(prevProps.isScriptLoaded === false){
            if (isScriptLoadSucceed) {
                this.setState({ showButton: true });
            } else if (!isScriptLoadSucceed){
            } else {
            }
        }
            
        
        
    }

    render() {
        const paypal = window.PAYPAL;
        const {
            total,
            currency,
            env,
            commit,
            client,
            onSuccess,
            onError,
            onCancel,
            items,
            details
        } = this.props;
    
        const {showButton} = this.state;
    
        const payment = () => paypal.rest.payment.create(env, client, {
            transactions: [
                {
                    amount: {
                        total,
                        currency,
                        details
                    },
                    item_list: {
                        items
                    }
                }
            ]
        });

        const onAuthorize = (data, actions) => actions.payment.execute()
        .then(() => {
            const payment = {
                paid: true,
                cancelled: false,
                payerID: data.payerID,
                paymentID: data.paymentID,
                paymentToken: data.paymentToken,
                returnUrl: data.returnUrl,
            };

            onSuccess(payment);
        });

        const payPalStyle = {
            color: 'white',
            size: 'medium',
            shape: 'rect',
            label: 'checkout',
            tagline: 'true'
        }

        if(showButton){
            return (
                <div>
                    <paypal.Button.react
                        env={env}
                        client={client}
                        commit={commit}
                        payment={payment}
                        onAuthorize={onAuthorize}
                        onCancel={onCancel}
                        onError={onError}
                        style={payPalStyle}
                    />
                </div>
            );
        }
        return(
            <div style={{
                width: '250px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgb(223, 223, 223)',
                color: 'rgb(78, 78, 78)',
            }}>
            </div>
        )
    }
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);





