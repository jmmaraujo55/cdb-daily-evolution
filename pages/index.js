/* MODULES */
import { Component } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { Grid, Button, Input, InputLabel, InputAdornment, FormControl } from '@material-ui/core';
// eslint-disable-next-line no-unused-vars
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line no-unused-vars
import { faPercent } from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line no-unused-vars
import Header from '../components/header';
// eslint-disable-next-line no-unused-vars
import DatePicker from '../components/datepicker';
// eslint-disable-next-line no-unused-vars
import Load from '../components/load';
// eslint-disable-next-line no-unused-vars
import Chart from '../components/chart';
import css from '../styles/index.module.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minDate: moment.tz('2010-01-04', 'America/Sao_Paulo').startOf('day'),
            maxDate: moment.tz('2019-12-03', 'America/Sao_Paulo').startOf('day'),
            startDate: moment.tz('2016-11-14', 'America/Sao_Paulo').startOf('day'),
            endDate: moment.tz('2016-12-26', 'America/Sao_Paulo').startOf('day'),
            cdbRate: 103.5,
            loading: false,
            chart: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Evolução diária - CDB'
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    min: 1000
                },
                series: []
            }
        };

        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.setCDBRate = this.setCDBRate.bind(this);
        this.send = this.send.bind(this);
    }

    setStartDate(_, date) {
        const state = this.state;

        state.startDate = moment.tz(date, 'DD-MM-YYYY', 'America/Sao_Paulo').startOf('day');
        this.setState(state);
    }

    setEndDate(_, date) {
        const state = this.state;

        state.endDate = moment.tz(date, 'DD-MM-YYYY', 'America/Sao_Paulo').startOf('day');
        this.setState(state);
    }

    setCDBRate(event) {
        const state = this.state;

        console.log(event.target.value);

        state.cdbRate = event.target.value ? event.target.value.match(/[0-9.]/g).join('') : '';
        this.setState(state);
    }

    async send() {
        this.setState({ loading: true });

        const state = this.state;
        const params = {
            investmentDate: this.state.startDate.format('YYYY-MM-DD'),
            currentDate: this.state.endDate.format('YYYY-MM-DD'),
            cdbRate: this.state.cdbRate
        };

        const response = await axios.post('/api/cdb', params);

        const x =  response.data.map(item => item.date);
        const y =  response.data.map(item => ({ y: item.unitPrice }));

        state.chart.xAxis.categories = x;
        state.chart.series[0] = { name: 'Valor', data: y };

        this.setState(state);
        this.setState({ loading: false });
    }

    render() {
        return (
            <div>
                <Header />
                <main className={css.main}>
                    <div className={css.left}>
                        <Grid container>
                            <Grid item xs={12} className={css.gridItem}>
                                <DatePicker label='Data Inicial' date={this.state.startDate} setDate={this.setStartDate} min={this.state.minDate} max={this.state.maxDate} />
                            </Grid>
                            <Grid item xs={12} className={css.gridItem}>
                                <DatePicker label='Data Final' date={this.state.endDate} setDate={this.setEndDate} min={this.state.minDate} max={this.state.maxDate} />
                            </Grid>
                            <Grid item xs={12} className={css.gridItem}>
                                <FormControl>
                                    <InputLabel htmlFor='cdb'> CDB </InputLabel>
                                    <Input
                                        id='cdb'
                                        className={css.input}
                                        value={this.state.cdbRate}
                                        onChange={this.setCDBRate}
                                        endAdornment={
                                            <InputAdornment position='start'>
                                                <FontAwesomeIcon icon={faPercent} className={css.icon} />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} className={css.gridItem}>
                                <span className={css.alert}>O valor inicial do CDB é sempre R$1000,00</span>
                            </Grid>
                            <Grid item xs={12} className={css.gridItem}>
                                <Button variant='contained' color='primary' onClick={this.send}>Calcular</Button>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={css.right}>
                        <Grid container className={css.center}>
                            {this.state.loading ? <Load /> : <Chart options={this.state.chart} />}
                        </Grid>
                    </div>
                </main>
            </div>
        );
    }
}

export default Home;
