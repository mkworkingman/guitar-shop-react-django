import React from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme';

const useStyles = makeStyles({
  link: {
    outline: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: '.5s color',
    WebkitTapHighlightColor: 'transparent',
    '&:hover, &:focus': {
      color: theme.palette.primary.main,
      '& div': {
        boxShadow: '0 0 20px ' + theme.palette.primary.dark
      },
      '& svg': {
        fill: theme.palette.primary.dark
      }
    }
  },
  itemImg: {
    maxWidth: 130,
    maxHeight: 130,
    width: '75%',
    minHeight: 100,
    minWidth: 100,
    background: '#8a8a8a',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center', textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)',
    justifyContent: 'center',
    transition: '.5s box-shadow',
    '&::before': {
      content: '""',
      paddingTop: '100%'
    }
  },
  svg: {
    transition: '.5s fill',
    width: '65%',
    height: '65%',
    '&::before': {
      content: '""',
      paddingTop: '100%'
    }
  }
});

const Info: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5">
        Info:
      </Typography>

      <Grid container spacing={2}>

        <Grid item xs={6} sm={3}>
          <Link to="/info/acoustic" className={classes.link}>
            <Typography variant="h6">Acoustic</Typography>
            <Box className={classes.itemImg}>
              <svg className={classes.svg} width="90" height="90" viewBox="0 0 90 90" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M81.6521 0.00346956C81.2851 0.00346956 80.9354 0.176961 80.5685 0.544761L77.9719 3.14712L76.8918 2.06107L75.3754 3.46981L76.5663 4.66343L75.0499 6.07564L73.9698 4.98959L72.4534 6.50937L73.537 7.59195L71.0478 10.1943C70.3034 10.9403 70.3034 11.6169 71.0478 12.3629L56.5521 26.8945C53.3186 24.3026 49.8703 22.3387 46.5987 21.3636C40.5124 19.5593 35.1046 20.8605 30.9086 25.0486C29.0564 26.9049 27.9208 29.1707 27.4465 31.8806C26.6918 36.2734 22.8247 39.7016 18.2513 40.0139C13.2625 40.3504 8.87949 42.3595 5.59399 45.6523C-3.07502 54.3407 -1.50324 70.1041 9.16338 80.7842C15.222 86.8563 22.9424 90 30.0466 90C35.4543 90 40.4708 88.1159 44.2168 84.3616C47.5057 81.0652 49.5068 76.6759 49.8426 71.6759C50.1542 67.0958 53.4674 63.2165 57.8504 62.4566C60.5543 61.9847 62.9223 60.8466 64.7745 58.9868C68.9532 54.7988 70.2515 49.365 68.4512 43.2686C67.8558 41.2318 66.7894 39.1603 65.5327 37.0854L60.4435 42.1825C60.987 43.2235 61.4475 44.2297 61.7452 45.2186C62.8115 48.8237 62.2438 51.7627 59.9034 54.1083C59.0656 54.9375 58.0685 55.3956 56.7668 55.628C49.2749 56.9292 43.4344 63.5149 42.9185 71.2422C42.7039 74.535 41.4298 77.3838 39.3491 79.483C33.3701 85.458 22.108 83.8897 14.1418 75.9022C6.17561 67.9216 4.49998 56.5059 10.4617 50.5309C12.5597 48.4421 15.3986 47.1686 18.6841 46.9535C26.3941 46.4365 32.9512 40.5829 34.2633 33.0743C34.4953 31.7731 34.9419 30.7703 35.7797 29.9306C37.3896 28.3171 39.2279 27.5434 41.4056 27.5434C42.3923 27.5434 43.5278 27.7481 44.6495 28.0847C46.8306 28.737 49.261 30.0243 51.5737 31.7731L40 43.3761C38.7309 43.0835 37.4124 43.0814 36.1424 43.37C34.8724 43.6586 33.6837 44.2304 32.6647 45.043C31.6457 45.8556 30.8226 46.888 30.2566 48.0634C29.6906 49.2388 29.3964 50.5269 29.3957 51.8321C29.3957 56.6135 33.2767 60.5031 38.0508 60.5031C42.825 60.5031 46.706 56.6135 46.706 51.8286C46.706 51.3012 46.5848 50.8119 46.4879 50.3088L77.9719 18.6468C78.7163 19.3928 79.5022 19.3928 80.2465 18.6468L82.843 16.0444L83.9232 17.1305L85.3288 15.7217L84.2486 14.6357L85.7616 13.1194L86.5198 14.6357L87.9254 13.1194L86.8452 12.0333L89.4417 9.43095C90.1861 8.68494 90.1861 7.90076 89.4417 7.15475L82.8396 0.54129C82.5272 0.215547 82.1024 0.0218864 81.6521 0V0.00346956ZM81.3267 4.22623L82.843 5.74601L76.1336 12.3629L74.728 10.9542L81.3267 4.22623ZM84.2486 6.82859L85.7616 8.34837L79.0555 14.9618L77.6465 13.4421L84.2486 6.82859ZM21.066 57.6891L16.1983 62.5677L27.3392 73.7335L32.2069 68.855L21.066 57.6891Z"/>
              </svg>
            </Box>
          </Link>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Link to="/info/electric" className={classes.link}>
            <Typography variant="h6">Electric</Typography>
            <Box className={classes.itemImg}>
              <svg className={classes.svg} width="90" height="90" viewBox="0 0 90 90" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 84C23.8807 84 25 82.8807 25 81.5C25 80.1193 23.8807 79 22.5 79C21.1193 79 20 80.1193 20 81.5C20 82.8807 21.1193 84 22.5 84Z"/>
                <path d="M34.3852 63L27 55.6212L30.6178 52L38 59.3788L34.3852 63Z"/>
                <path d="M20 62.6178L23.6198 59L31 66.3807L27.3802 70L20 62.6178Z"/>
                <path d="M17.1215 67L23 72.8785L20.8785 75L15 69.1215L17.1215 67Z"/>
                <path d="M28.0245 75.0247C27.5352 75.5143 27.202 76.1381 27.0671 76.8171C26.9322 77.4961 27.0016 78.1999 27.2666 78.8394C27.5316 79.479 27.9802 80.0256 28.5557 80.4102C29.1312 80.7947 29.8078 81 30.5 81C31.1922 81 31.8688 80.7947 32.4443 80.4102C33.0198 80.0256 33.4684 79.479 33.7334 78.8394C33.9984 78.1999 34.0678 77.4961 33.9329 76.8171C33.798 76.1381 33.4648 75.5143 32.9755 75.0247C31.608 73.6584 29.392 73.6584 28.0245 75.0247Z"/>
                <path d="M86.8452 15.0457L86.1012 14.3032C91.0017 9.64718 91.4382 8.39168 86.5227 3.47919C81.6072 -1.4408 80.3502 -0.999805 75.6957 3.89919L74.9547 3.15669C75.6042 2.36169 75.8757 1.56969 75.1572 0.851192C74.2722 -0.0323064 73.2822 0.566193 72.3027 1.54569C71.3247 2.52369 70.7293 3.51219 71.6113 4.39269C72.3312 5.11119 73.1202 4.84419 73.9167 4.19469L74.6907 4.96869C73.5612 6.17318 72.2487 7.58168 70.6738 9.20018L69.7918 8.31818C70.4428 7.52168 70.7082 6.73268 69.9927 6.01268C69.1093 5.13369 68.1193 5.72619 67.1443 6.70118C66.1633 7.68218 65.5678 8.67068 66.4528 9.55418C67.1713 10.2727 67.9618 10.0012 68.7583 9.35018L69.6507 10.2427C69.4782 10.4167 69.3238 10.5772 69.1453 10.7557C67.7713 12.1297 66.5833 13.3252 65.5588 14.4052L64.6333 13.4782C65.2813 12.6817 65.5498 11.8927 64.8298 11.1757C63.9478 10.2937 62.9578 10.8862 61.9828 11.8642C61.0048 12.8452 60.4063 13.8337 61.2913 14.7142C62.0113 15.4342 62.8003 15.1672 63.5968 14.5162L64.5613 15.4837C61.6078 18.7567 60.5923 20.8432 61.7143 23.1982L42.4138 41.4096C40.0348 39.0966 37.3378 37.1841 33.1573 37.5036C23.1628 38.2596 29.7148 49.6416 16.9123 50.4936C12.3343 50.7951 7.98734 51.8001 4.84334 54.9516C-3.15164 62.9436 -0.595647 73.9146 7.74434 82.2576C16.0828 90.5976 27.0553 93.1491 35.0488 85.1586C39.2173 80.9931 39.0778 73.4346 40.4713 68.9181C42.2698 63.0816 51.6658 65.0571 51.2353 58.5651C51.1978 57.9531 51.0478 57.5661 50.8138 57.3351C49.6453 56.1666 46.3693 58.9521 44.3998 56.9811C43.7818 56.3661 43.2958 55.2786 43.0408 53.4711L66.8023 28.2907C69.1573 29.4141 71.2467 28.3957 74.5212 25.4422L75.4857 26.4067C74.8347 27.2047 74.5692 27.9951 75.2832 28.7151C76.1652 29.5971 77.1582 29.0016 78.1362 28.0207C79.1142 27.0457 79.7097 26.0542 78.8247 25.1707C78.1062 24.4537 77.3172 24.7237 76.5207 25.3732L75.5952 24.4492C76.6767 23.4247 77.8707 22.2367 79.2447 20.8612C79.4232 20.6827 79.5852 20.5297 79.7607 20.3557L80.6472 21.2467C79.9977 22.0447 79.7292 22.8337 80.4507 23.5537C81.3327 24.4357 82.3212 23.8402 83.2992 22.8622C84.2712 21.8842 84.8697 20.8927 83.9877 20.0122C83.2707 19.2937 82.4817 19.5622 81.6852 20.2102L80.8047 19.3297C82.4217 17.7532 83.8302 16.4407 85.0332 15.3142L85.8087 16.0867C85.1562 16.8832 84.8907 17.6737 85.6107 18.3922C86.4927 19.2712 87.4812 18.6787 88.4577 17.6992C89.4387 16.7212 90.0327 15.7297 89.1507 14.8492C88.4307 14.1277 87.6417 14.3977 86.8452 15.0457V15.0457ZM45.3403 60.9531C45.2053 61.0116 45.0673 61.0671 44.9188 61.1286C42.2563 62.2236 38.6023 63.7221 37.3018 67.9401C36.8248 69.4806 36.5278 71.1891 36.2143 73.0026C35.5963 76.5756 34.8928 80.6241 32.7058 82.8126C29.6473 85.8711 26.0473 87.1251 21.9973 86.5476C18.0328 85.9851 13.8013 83.6301 10.0858 79.9116C6.36884 76.1961 4.01385 71.9676 3.45285 68.0046C2.87385 63.9561 4.13235 60.3546 7.18634 57.2961C9.28334 55.1991 12.3508 54.1206 17.1328 53.8026C26.0368 53.2131 28.0633 48.0276 29.4043 44.5971C30.4513 41.9136 30.8053 41.0076 33.4108 40.8096C36.1213 40.6041 37.9378 41.7066 40.0018 43.6866L33.5143 49.8096L40.1923 56.4906L40.3123 56.3631C40.7203 57.5841 41.2918 58.5636 42.0553 59.3271C42.9355 60.2242 44.0932 60.7973 45.3403 60.9531V60.9531ZM68.6593 18.6397C68.4804 18.8182 68.2681 18.9598 68.0345 19.0563C67.801 19.1529 67.5507 19.2024 67.2979 19.2022C67.0452 19.202 66.795 19.152 66.5615 19.0551C66.3281 18.9582 66.1161 18.8163 65.9375 18.6374C65.7589 18.4586 65.6174 18.2463 65.5208 18.0127C65.4243 17.7791 65.3747 17.5288 65.3749 17.2761C65.3751 17.0233 65.4251 16.7731 65.522 16.5397C65.619 16.3063 65.7609 16.0942 65.9398 15.9157C66.301 15.555 66.7907 15.3527 67.3011 15.3531C67.8115 15.3535 68.3009 15.5567 68.6615 15.9179C69.0221 16.2791 69.2245 16.7688 69.2241 17.2793C69.2236 17.7897 69.0205 18.279 68.6593 18.6397V18.6397ZM71.1238 10.7302C71.8767 9.98018 73.0947 9.98018 73.8492 10.7302C74.2085 11.092 74.4098 11.5814 74.4092 12.0913C74.4087 12.6012 74.2063 13.0901 73.8462 13.4512C73.0917 14.2042 71.8737 14.2012 71.1267 13.4512C70.9472 13.2731 70.8047 13.0613 70.7073 12.8279C70.61 12.5945 70.5597 12.3442 70.5594 12.0913C70.5591 11.8384 70.6088 11.588 70.7057 11.3544C70.8025 11.1208 70.9446 10.9087 71.1238 10.7302V10.7302ZM74.1042 24.0802C73.7374 24.4129 73.2567 24.5918 72.7615 24.5798C72.2664 24.5678 71.7949 24.3659 71.4446 24.0158C71.0943 23.6657 70.8921 23.1942 70.8798 22.6991C70.8676 22.204 71.0462 21.7232 71.3787 21.3562C72.1347 20.6062 73.3512 20.6062 74.1042 21.3592C74.2834 21.5376 74.4255 21.7496 74.5225 21.983C74.6195 22.2165 74.6695 22.4668 74.6695 22.7197C74.6695 22.9725 74.6195 23.2228 74.5225 23.4563C74.4255 23.6897 74.2834 23.9018 74.1042 24.0802V24.0802ZM76.3077 5.54769C76.4863 5.36874 76.6985 5.22682 76.9321 5.13008C77.1657 5.03335 77.416 4.98369 77.6689 4.98397C77.9217 4.98425 78.172 5.03446 78.4053 5.13171C78.6387 5.22896 78.8505 5.37134 79.0287 5.55069C79.2977 5.82009 79.4807 6.1632 79.5546 6.53663C79.6285 6.91005 79.59 7.29701 79.444 7.64856C79.298 8.0001 79.051 8.30045 78.7343 8.51161C78.4175 8.72277 78.0453 8.83525 77.6646 8.83483C77.2839 8.83441 76.912 8.72111 76.5957 8.50925C76.2794 8.2974 76.0331 7.9965 75.8878 7.64463C75.7426 7.29276 75.705 6.90572 75.7797 6.53247C75.8544 6.15921 76.0382 5.8165 76.3077 5.54769V5.54769ZM79.2867 18.8947C78.9221 19.2376 78.4382 19.4252 77.9377 19.4175C77.4371 19.4099 76.9593 19.2076 76.6053 18.8536C76.2513 18.4997 76.049 18.0218 76.0414 17.5212C76.0337 17.0207 76.2213 16.5368 76.5642 16.1722C77.3142 15.4252 78.5337 15.4222 79.2882 16.1722C79.6485 16.5337 79.8506 17.0234 79.8503 17.5337C79.8501 18.0441 79.6474 18.5335 79.2867 18.8947V18.8947ZM84.4692 13.7107C84.2908 13.8892 84.0789 14.0309 83.8457 14.1276C83.6124 14.2243 83.3625 14.274 83.11 14.2741C82.8576 14.2742 82.6076 14.2245 82.3743 14.128C82.141 14.0314 81.929 13.8899 81.7505 13.7114C81.5719 13.533 81.4303 13.3211 81.3336 13.0879C81.2369 12.8546 81.1871 12.6047 81.187 12.3522C81.187 12.0997 81.2366 11.8497 81.3332 11.6165C81.4297 11.3832 81.5713 11.1712 81.7497 10.9927C82.4997 10.2367 83.7192 10.2397 84.4707 10.9927C85.2222 11.7457 85.2252 12.9577 84.4692 13.7107"/>
              </svg>
            </Box>
          </Link>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Link to="/info/bass" className={classes.link}>
            <Typography variant="h6">Bass</Typography>
            <Box className={classes.itemImg}>
              <svg className={classes.svg} width="90" height="90" viewBox="0 0 90 90" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M81 5.61097C82.78 5.61097 84.5201 6.10459 86.0001 7.0294C87.4802 7.95421 88.6337 9.26869 89.3149 10.8066C89.9961 12.3445 90.1743 14.0368 89.8271 15.6694C89.4798 17.302 88.6226 18.8017 87.3639 19.9788C86.1053 21.1558 84.5016 21.9574 82.7558 22.2822C81.01 22.6069 79.2004 22.4402 77.5558 21.8032C75.9113 21.1662 74.5057 20.0874 73.5168 18.7034C72.5278 17.3193 72 15.692 72 14.0274C72 11.7952 72.9482 9.65449 74.636 8.07609C76.3239 6.4977 78.613 5.61097 81 5.61097ZM81 39.2768C82.78 39.2768 84.5201 39.7704 86.0001 40.6952C87.4802 41.62 88.6337 42.9345 89.3149 44.4724C89.9961 46.0103 90.1743 47.7026 89.8271 49.3352C89.4798 50.9679 88.6226 52.4675 87.3639 53.6446C86.1053 54.8217 84.5016 55.6233 82.7558 55.948C81.01 56.2728 79.2004 56.1061 77.5558 55.4691C75.9113 54.832 74.5057 53.7533 73.5168 52.3692C72.5278 50.9851 72 49.3579 72 47.6933C72 45.4611 72.9482 43.3203 74.636 41.7419C76.3239 40.1635 78.613 39.2768 81 39.2768V39.2768ZM30 0C22.0435 0 14.4129 2.95577 8.7868 8.21708C3.1607 13.4784 0 20.6142 0 28.0549V33.6658C0.0094382 35.8403 0.694236 37.9654 1.97113 39.7827C3.24802 41.6 5.06201 43.0312 7.19253 43.9024C9.32305 44.7735 11.6783 45.047 13.972 44.6897C16.2656 44.3323 18.3988 43.3595 20.1123 41.8894C21.8257 40.4194 23.0455 38.5155 23.6234 36.4092C24.2013 34.303 24.1124 32.085 23.3674 30.0252C22.6225 27.9653 21.2536 26.1521 19.4273 24.8062C17.601 23.4603 15.3958 22.6396 13.08 22.4439C14.3179 19.1696 16.6084 16.3335 19.6376 14.3245C22.6668 12.3154 26.2863 11.2317 30 11.2219C36.3652 11.2219 42.4697 13.5866 46.9706 17.7956C51.4714 22.0047 54 27.7133 54 33.6658C54 53.8092 40.62 68.3978 12 79.6758L16.56 90C49.86 76.9825 66 58.5224 66 33.6658C66 24.7371 62.2071 16.1741 55.4558 9.8605C48.7045 3.54693 39.5478 0 30 0Z"/>
              </svg>
            </Box>
          </Link>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Link to="/info/ukulele" className={classes.link}>
            <Typography variant="h6">Ukulele</Typography>
            <Box className={classes.itemImg}>
              <svg className={classes.svg} width="90" height="90" viewBox="0 0 90 90" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M89.5604 15.4466L89.1793 15.0655C90.0424 13.706 89.886 11.8814 88.7022 10.6974L79.0353 1.03088C77.8514 -0.154557 76.027 -0.310614 74.6676 0.552203L74.5551 0.439661C74.2731 0.157558 73.8919 0 73.4943 0H70.4936C70.096 0 69.7134 0.157558 69.4328 0.439661L67.9325 1.94021C67.6503 2.22232 67.4928 2.60195 67.4928 3.0011V6.0022H64.492C64.0945 6.0022 63.7119 6.15976 63.4313 6.44186L61.9309 7.94241C61.6488 8.22451 61.4913 8.60416 61.4913 9.00331V12.0044C61.4913 12.4035 61.6488 12.7847 61.9309 13.0653L62.0284 13.1628C61.0006 14.6754 61.8559 16.9292 62.7696 18.1672C62.8177 18.2632 62.8597 18.3863 62.8762 18.4733L59.4793 21.782L50.9271 30.1116C50.2264 29.6374 49.5438 29.2157 48.8641 28.8676C42.7396 25.7134 37.3982 25.5364 33.8153 28.3664C33.1761 28.773 30.2489 30.8378 27.4837 36.1572C25.4597 40.0482 20.6735 40.5029 19.2586 40.5479C18.6164 40.5689 18.0223 40.6424 17.4386 40.7714C14.2969 41.4722 6.62389 43.6075 3.23303 48.2757L3.1055 48.4573C-2.12933 55.7905 -0.588432 67.5578 6.53987 74.6884C7.84071 75.9894 9.49266 77.655 11.5496 79.7482C13.6247 81.789 15.2901 83.4411 16.5909 84.7421C20.0838 88.2339 24.5084 90.0015 29.0936 90C33.0216 90 37.0651 88.7036 40.7381 86.0821L40.8986 85.965C45.5753 82.5693 47.7103 74.894 48.4109 71.7518C48.54 71.1681 48.6135 70.5739 48.6345 69.9347C48.6945 68.1145 49.2422 63.6714 53.0262 61.7056C58.3435 58.9402 60.408 56.0126 60.8146 55.3718C63.6429 51.787 63.4673 46.448 60.3165 40.3228C60.0074 39.7211 59.6473 39.1253 59.2633 38.5371L62.483 35.3995L67.8544 30.167C67.8559 30.1656 67.8574 30.1656 67.8574 30.1656C67.8589 30.1641 67.8589 30.1625 67.8589 30.1625L71.3353 26.7773C71.4358 26.8749 71.5498 26.9573 71.6744 27.0234C72.9392 27.6956 75.1478 28.593 76.5641 27.7016L76.9362 28.0738C77.2182 28.3559 77.5994 28.5135 77.997 28.5135H80.9977C81.3953 28.5135 81.7779 28.3559 82.0586 28.0738L83.5589 26.5733C83.8409 26.2912 83.9985 25.9115 83.9985 25.5123V22.5113H86.9993C87.3968 22.5113 87.7794 22.3537 88.06 22.0716L89.5604 20.571C89.8425 20.2889 90 19.9093 90 19.5101V16.509C90 16.1084 89.841 15.7273 89.5604 15.4466ZM70.495 3.62383L71.1162 3.0026H72.8746L73.4958 3.62383V5.38248L72.8746 6.0037H71.1162L70.495 5.38248V3.62383ZM64.4936 9.626L65.1147 9.00484H66.8732L67.4943 9.626V11.3847L66.8732 12.0059H65.1147L64.4936 11.3847V9.626ZM61.4373 32.2288L57.3023 28.0933L60.528 24.9512L64.6631 29.0866L61.4373 32.2288ZM50.6871 42.7012L46.552 38.5656L49.7778 35.4235L53.9128 39.559L50.6871 42.7012ZM40.2084 52.8089C39.9878 52.4353 39.7478 52.0736 39.4912 51.7255C39.4492 51.6685 39.4072 51.6129 39.3652 51.5574C39.1146 51.2288 38.849 50.9137 38.57 50.612C38.525 50.5641 38.4829 50.513 38.4365 50.465C37.7808 49.7792 37.0531 49.164 36.2594 48.6374C36.2504 48.6313 36.2414 48.6223 36.2309 48.6163L39.0276 45.8929L43.1627 50.0283L40.2474 52.8674C40.2369 52.8479 40.2204 52.8299 40.2084 52.8089ZM45.3127 47.9351L41.1776 43.7996L44.402 40.6574L48.537 44.7929L45.3127 47.9351ZM56.063 37.4643L51.9279 33.3287L55.1522 30.1881L59.2872 34.3236L56.063 37.4643ZM58.4185 53.5636L58.2895 53.7528C58.2744 53.7798 56.6571 56.4357 51.6428 59.0407C46.3075 61.8167 45.6968 68.0049 45.6368 69.8357C45.6217 70.2872 45.5723 70.6999 45.4838 71.0976C44.9946 73.2899 43.0921 80.6636 39.1191 83.5491L38.9901 83.6437C32.1694 88.5129 24.2083 88.1123 18.7154 82.6203C17.4086 81.3134 15.7387 79.6552 13.6742 77.6265C11.6276 75.5437 9.96975 73.8736 8.66441 72.5666C3.31106 67.2111 0.598368 57.138 5.55712 50.1919L5.65765 50.0509C8.53088 46.0939 15.9037 44.1927 18.0943 43.7035C18.4919 43.615 18.903 43.5655 19.3561 43.5504C21.1866 43.4905 27.3742 42.8798 30.1484 37.5438C32.756 32.5289 35.4117 30.9113 35.4267 30.9023L35.6262 30.7658C39.1401 27.9297 44.57 30.0335 47.4943 31.5371C47.9008 31.7472 48.3135 31.9902 48.7321 32.2543L33.3696 47.2178C32.0718 46.7706 30.6855 46.5171 29.2376 46.5171C22.2054 46.5171 16.4844 52.2387 16.4844 59.2718H19.4851C19.4851 53.8938 23.8603 49.5181 29.2376 49.5181C30.6884 49.5181 32.0628 49.8453 33.3006 50.417C33.5287 50.522 33.7567 50.6316 33.9758 50.7546C34.0493 50.7951 34.1168 50.8416 34.1889 50.8837C34.3989 51.0082 34.606 51.1358 34.8055 51.2753C34.8655 51.3173 34.9211 51.3623 34.9796 51.4044C35.1867 51.5559 35.3907 51.7135 35.5842 51.8815C35.6248 51.916 35.6638 51.9551 35.7043 51.9895C35.9113 52.1742 36.1109 52.3632 36.3014 52.5643C36.3269 52.5913 36.3509 52.6198 36.3765 52.6468C36.576 52.8614 36.7665 53.085 36.9466 53.3176C36.9616 53.3371 36.9751 53.3565 36.9901 53.3761C37.1747 53.6192 37.3487 53.8698 37.5107 54.1294C37.5197 54.1444 37.5287 54.1593 37.5377 54.1744C37.7013 54.44 37.8528 54.7146 37.9908 54.9952C37.9968 55.0071 38.0029 55.0192 38.0088 55.0312C38.1469 55.3163 38.2714 55.6089 38.3825 55.9075C38.771 56.9579 38.9931 58.0878 38.9931 59.2718C38.9931 64.6497 34.618 69.0253 29.2406 69.0253V72.0264C36.2729 72.0264 41.9938 66.3048 41.9938 59.2718C41.9938 58.0803 41.8168 56.9309 41.5107 55.8355L51.7403 45.8704H51.7419V45.8688L57.0742 40.6739C57.2782 41.013 57.4778 41.3536 57.6534 41.6943C59.1522 44.6189 61.2527 50.0509 58.4185 53.5636ZM69.2467 24.6226L66.8116 26.9949L62.6766 22.8594L65.0967 20.502C66.375 19.2236 65.8379 17.4334 65.3188 16.5781C65.2888 16.5286 65.2558 16.4806 65.2212 16.434C64.8806 15.9959 64.6376 15.3896 64.5641 15.007H67.4943C67.892 15.007 68.2746 14.8494 68.5551 14.5673L70.0555 13.0668C70.3375 12.7847 70.495 12.4051 70.495 12.0059V9.00484H73.4958C73.8935 9.00484 74.276 8.84724 74.5566 8.56514L76.057 7.06459C76.339 6.78249 76.4966 6.40284 76.4966 6.0037V3.0041C76.6211 2.9936 76.7576 2.99659 76.9152 3.15265L86.5792 12.8177C86.7097 12.9497 86.7307 13.1013 86.7307 13.1808C86.7307 13.2529 86.7142 13.3849 86.6166 13.5049H83.9985C83.6009 13.5049 83.2183 13.6625 82.9378 13.9446L81.4374 15.4452C81.1553 15.7273 80.9977 16.1069 80.9977 16.506V19.1275L80.6196 19.5072H77.997C77.5994 19.5072 77.2168 19.6647 76.9362 19.9468L75.4358 21.4474C75.1537 21.7294 74.9962 22.1091 74.9962 22.5082V25.0817C74.5986 25.0217 73.871 24.7636 73.2558 24.4605C71.9354 23.263 70.5476 23.3245 69.2467 24.6226ZM80.9977 24.8881L80.3765 25.5093H78.6181L77.997 24.8881V23.1295L78.6181 22.5082H80.3765L80.9977 23.1295V24.8881ZM86.9993 18.8859L86.3781 19.5072H84.6197L83.9985 18.8859V17.1273L84.6197 16.506H86.3781L86.9993 17.1273V18.8859Z"/>
                <path d="M23.9821 73.0097L37.4104 59.5814C37.9971 58.9947 37.9971 58.0465 37.4104 57.4599C36.8238 56.8732 35.8756 56.8732 35.289 57.4599L21.8606 70.8882L20.7998 69.8274L35.5455 55.0803C36.1322 54.4936 36.1322 53.5454 35.5455 52.9587C34.9588 52.3721 34.0106 52.3721 33.424 52.9587L18.6783 67.7059L17.616 66.6437L31.0444 53.2168C31.631 52.6301 31.631 51.6819 31.0444 51.0953C30.4578 50.5086 29.5095 50.5086 28.9228 51.0953L15.4944 64.5221L14.4337 63.4613C13.8471 62.8747 12.8988 62.8747 12.3122 63.4613C11.7255 64.048 11.7255 64.9962 12.3122 65.5829L13.373 66.6437L12.3122 67.7044C11.7255 68.291 11.7255 69.2393 12.3122 69.826C12.6047 70.1186 12.9888 70.2655 13.373 70.2655C13.7571 70.2655 14.1411 70.1186 14.4337 69.826L15.4944 68.7651L16.5567 69.8274L15.496 70.8882C14.9094 71.4749 14.9094 72.4231 15.496 73.0097C15.7886 73.3023 16.1727 73.4494 16.5567 73.4494C16.9408 73.4494 17.325 73.3023 17.6175 73.0097L18.6783 71.949L19.739 73.0097L18.6783 74.0705C18.0917 74.6572 18.0917 75.6054 18.6783 76.192C18.9709 76.4846 19.3549 76.6317 19.739 76.6317C20.1231 76.6317 20.5073 76.4846 20.7998 76.192L21.8606 75.1313L22.9213 76.192C23.2139 76.4846 23.598 76.6317 23.9821 76.6317C24.3662 76.6317 24.7503 76.4846 25.0429 76.192C25.6295 75.6054 25.6295 74.6572 25.0429 74.0705L23.9821 73.0097Z"/>
              </svg>
            </Box>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Info;