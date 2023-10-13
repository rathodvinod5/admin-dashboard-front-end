import React, { useContext, useEffect, useState } from 'react';
import { Stack, Paper, Typography, Button, IconButton, ToggleButton, LinearProgress,
   } from '@mui/material';
import { MoreVert, TrendingUp, PersonOutline, Devices, AttachMoney, ArrowDropUp,
   } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import useToken from '../../utils/useToken';
import './styles.css';
import GlobalDataContext from '../../context/dashboardContext';
import Chart from "react-apexcharts";

const zipcar = require('../../../assets/background/logo-zipcar.png');
const bitbank = require('../../../assets/background/logo-bitbank.png');
const aviato = require('../../../assets/background/logo-aviato.png');


export default function Home({ type }) {
  const { token } = useToken;
  const { globalData } = useContext(GlobalDataContext);

  const [data, setStatisticData] = useState(null);
   
  useEffect(() => {
    if(globalData.statistics !== null && globalData.statistics.stats !== undefined)
      setStatisticData(globalData.statistics.stats);
  }, [data])

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    // padding: theme.spacing(2),
    padding: 20,
    textAlign: 'left',
  }));

  const baseTitleStyles = {
    lineHeight: 0.8, 
    fontWeight: 500, 
    fontFamily: 'Inter, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  }

  const Title = styled(Typography)(({ theme }) => ({
    ...baseTitleStyles,
    fontSize: 24,
    color: theme.palette.mode === 'dark' ? 'rgba(231, 227, 252, 0.87)' : 'rgba(58, 53, 65, 0.87)',
  }));

  const SubTitle = styled(Typography)(({ theme }) => ({
    ...baseTitleStyles,
    fontSize: 15,
    color: theme.palette.mode === 'dark' ? 'rgba(231, 227, 252, 0.68)' : 'rgba(58, 53, 65, 0.68)',
  }));

  const AmountType1 = styled(Typography)(({ theme }) => ({
    ...baseTitleStyles,
    fontSize: 32,
    color: theme.palette.mode === 'dark' ? 'rgba(231, 227, 252, 0.87)' : 'rgba(58, 53, 65, 0.87)',
  }));
  
  const AmountType2 = styled(Typography)(({ theme }) => ({
    ...baseTitleStyles,
    fontSize: 28,
    color: theme.palette.primary.main,
  }));

  const AmountType3 = styled(Typography)(({ theme }) => ({
    ...baseTitleStyles,
    fontSize: 22,
    // color: theme.palette.primary.main,
  }));

  const CustomToggleContainer = styled(ToggleButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    width: '45px',
    height: '45px',
    // marginRight: 1.2, 
    borderWidth: 0,
    // ':hover': { backgroundColor, }
  }));

  const CustomToggleContainerAlt = styled(ToggleButton)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(231, 227, 252, 0.04)' : 'rgb(244, 245, 250)',
    width: '40px',
    height: '40px', //rgba(231, 227, 252, 0.68);
    borderWidth: 0,
    borderColor: 'transparent',
    border: 'none'
  }));

  const PointsText = styled(Typography)(({ theme }) => ({
    ...baseTitleStyles,
    fontSize: 14,
    color: theme.palette.primary.main,
  }));

  const CustomArrowDropUp = styled(ArrowDropUp)(({ theme }) => ({
    color: theme.palette.primary.main,
  }));

  const getIcons = (title) => {
    switch(title){
      case 'Sales' : return <TrendingUp sx={{ color: '#ffffff' }} />;
      case 'Customers' : return <PersonOutline sx={{ color: '#ffffff' }} />;
      case 'Products' : return <Devices sx={{ color: '#ffffff' }} />;
      default: return <AttachMoney sx={{ color: '#ffffff' }} />;
    }
  }

  const theme = useTheme();
  const chartData = {  
    series: [{
        name: "Desktops",
        data: [10, 48, 25, 51]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false,
        }
      },
      colors: [theme.palette.primary.main],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      
      grid: {
        show: false,
      },
      xaxis: {
        lines: {
          show: false,
        },
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        }
        // categories: ['Jan', 'Feb', 'Mar', 'Apr'],
      },
      yaxis: {
        show: false,
      },
      markers: {
        size: 4
      },
    },
  };


  return (
    <div style={{ height: '100%' }}>
      <Stack direction="row" spacing={3}>
        <Item 
          variant={type === 'outlined' ? type : 'elevation'}
          sx={{ width: '34%', height: 200 }} 
          elevation={3}
          className='trophy-container'
          // variant="outlined"
        >
          <div className='trophy-outer-container'>
            <div className='trophy-container'>
                <img 
                  className='trophy-image'
                  alt="trophy"
                  src={'https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-3/images/misc/trophy.png'}
                  // width={80px}
                  // height={100}
                />
              </div>
          </div>
          <Title> Welcome {token}</Title>
          <SubTitle style={{ marginTop: 10 }}>Best seller of the month</SubTitle>
          <br />
          <br />
          <AmountType2>
            $42.8k
          </AmountType2>
          <Button variant="contained" sx={{ marginTop: 1.5, color: '#ffffff' }}>
            View Sales
          </Button>
        </Item>
        
        <Item 
          variant={type === 'outlined' ? type : 'elevation'}
          sx={{ width: '59%', height: 200 }} 
          elevation={3}
          // variant="outlined"
        > 
          <Stack direction="row" justifyContent='space-between'>
            <Title>Statistics Card</Title>
            <IconButton>
              <MoreVert fontSize='small' />
            </IconButton>
          </Stack>

          <Stack direction="row" >
            <SubTitle style={{ fontWeight: 'bold' }}>Total 48.5% growth</SubTitle>
            <SubTitle>😎 this month</SubTitle>
          </Stack>
           
          <br />
          <br />
          <br />
          {data !== null ? (
            <Stack direction="row" justifyContent='space-between'>
              {data.map((ele, index) => {
                return(
                  <Stack key={`custom-toggle-cont-${index}`} direction="row" justifyContent='space-between' sx={{ marginRight: 4.5 }}>
                    {/* <Button disabled={true} sx={{ marginLeft: 1, width: 40, height: 40 }}>
                      {getIcons(ele.title)}
                    </Button> */}
                      <CustomToggleContainer value="check" disabled={true}>
                        {getIcons(ele.title)}
                      </CustomToggleContainer>
                    <div style={{ marginLeft: 10 }}>
                      <SubTitle>{ele.title}</SubTitle>
                      <AmountType3 sx={{ marginTop: 1.5 }}>{ele.amount}</AmountType3>
                    </div>
                  </Stack>
                )
              })}
            </Stack>
          ) : null}
        </Item>
      </Stack>
        
      <br />
      <Stack direction="row" spacing={3}>

        <Item 
          variant={type === 'outlined' ? type : 'elevation'}
          sx={{ width: '34%', height: 400 }} 
          elevation={3}
          // variant="outlined"
        > 
          <Stack direction="row" justifyContent='space-between' alignItems="center">
            <Title>Weekly Overview</Title>
            <IconButton>
              <MoreVert fontSize='small' />
            </IconButton>
          </Stack>
          <br/>
          <Stack direction="row" justifyContent='flex-start' alignItems="center">
            <AmountType1 sx={{ fontWeight: 'bold' }}>$24,895</AmountType1>
            <CustomArrowDropUp />
            <PointsText>10%</PointsText>
          </Stack>
          <br />
          <SubTitle sx={{ fontSize: 13 }}>
            Compared to $84,325 last year
          </SubTitle>
          <br />

          {[0, 1, 2].map((ele, index) => (
            <Stack key={`generic-map-${index}`} sx={{ width: '100%', marginTop: 4 }} direction="row" justifyContent="space-between" alignItems="center">
              <CustomToggleContainerAlt value="check" disabled={true}>
                {/* <CustomArrowDropUp /> */}
                <img 
                  alt={`img-${ele}`}
                  src={ele === 0 ? zipcar : ele === 1 ? bitbank : aviato}
                  width={20}
                  height={20}
                />
              </CustomToggleContainerAlt>
              <Stack sx={{ width: '100%' }} direction="row" justifyContent="space-between" alignItems="center">
                <div style={{ paddingLeft: 10 }}>
                  <Title sx={{ fontSize: 15, fontWeight: '600' }}>Zipcar</Title>
                  <SubTitle sx={{ fontSize: 13, marginTop: 1 }}>
                    Vuejs, React & HTML
                  </SubTitle>
                </div>
                <div>
                  <Title sx={{ fontWeight: 'bold', fontSize: 15 }}>$24,895.65</Title>
                  <LinearProgress sx={{ marginTop: 1.5  }} variant="determinate" value={80} />
                </div>
              </Stack>
            </Stack>
          ))}  
        </Item>

        <Stack sx={{ width: '23%'}} spacing={3}>
          <Item 
            variant={type === 'outlined' ? type : 'elevation'}
            sx={{ width: '100%', height: 185 }} 
            elevation={3}
            // variant="outlined"
          >
            <Title>$86.4k</Title>
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
              // width="100%"
              // height="100%"
              curve='smooth'
              style={{ marginTop: -10 }}
            />
            <Title sx={{ fontSize: 15, fontWeight: '600', marginTop: -2, textAlign: 'center' }}>Total Profit</Title>
          </Item>
          {/* <div style={{ height: '30px' }} /> */}
          <Item 
            variant={type === 'outlined' ? type : 'elevation'}
            sx={{ width: '100%', height: 185 }} 
            elevation={3}
            // variant="outlined"
          >
            <Title>$86.4k</Title>
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
              // width="100%"
              // height="100%"
              curve='smooth'
              style={{ marginTop: -10 }}
            />
            <Title sx={{ fontSize: 15, fontWeight: '600', marginTop: -2, textAlign: 'center' }}>Total Profit</Title>
          </Item>
        </Stack>

        <Item 
          variant={type === 'outlined' ? type : 'elevation'}
          sx={{ width: '34%', height: 400 }} 
          elevation={3}
          // variant="outlined"
        > 
          <Stack direction="row" justifyContent='space-between' alignItems="center">
            <Title>Weekly Overview</Title>
            <IconButton>
              <MoreVert fontSize='small' />
            </IconButton>
          </Stack>
        </Item>

      </Stack>

      <GrandChild />
    </div>
  );
}

const GrandChild = () => {
  const { globalData } = useContext(GlobalDataContext);

  return(
    <div>
      HELLO {globalData?.user}
    </div>
  );

}