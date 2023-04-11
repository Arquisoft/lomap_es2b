import { CircularProgress } from "@mui/material"
import { LoaderContainer } from "./Styles"

const Loader = () => {
  return (
    <LoaderContainer>
      <CircularProgress color='secondary' />
    </LoaderContainer>
  )
}

export default Loader