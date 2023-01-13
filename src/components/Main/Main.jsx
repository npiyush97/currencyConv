import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Container } from "@mui/system";
import CurrencyAutocomplete from "../Autocomplete/Autocomplete";
function Main() {
  return (
    <>
      <Container sx={{width:'100%',height:"90%",margin:'0 auto',display:'flex',justifyContent:'center',alignContent:'center'}}>
        <Card sx={{height:'100%',display:"flex",alignItems:'center',flexDirection:'column',justifyContent:'space-evenly'}}>
          <CardContent sx={{display:'flex',justifyContent:'center',alignContent:'center'}}>
            <CurrencyAutocomplete />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Main;
