import { Component } from 'react';
import Highcharts from 'highcharts';
// eslint-disable-next-line no-unused-vars
import HighchartsReact from 'highcharts-react-official';

class Chart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <HighchartsReact highcharts={Highcharts} options={this.props.options} />
        </div>;
    }
}

export default Chart;
