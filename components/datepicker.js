import { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment-timezone';

class DatePicker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                <KeyboardDatePicker
                    label={this.props.label}
                    value={this.props.date}
                    onChange={this.props.setDate}
                    minDate={this.props.min}
                    maxDate={this.props.max}
                    format='DD-MM-YYYY'
                    onKeyDown={e => e.preventDefault()}
                />
            </MuiPickersUtilsProvider>
        </div>;
    }
}

export default DatePicker;
