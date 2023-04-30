import { IconButton, Tooltip } from "@mui/material"
import { useTranslation } from "react-i18next"
import { CloseIcon } from "./Styles"


type Props = {
  onClick: () => void
}

const CloseButton = ({ onClick }: Props) => {

  const { t } = useTranslation()

  return (
    <Tooltip title={t('popup.close')} sx={{ float: 'right' }}>
      <IconButton onClick={onClick}>
        <CloseIcon />
      </IconButton>
    </Tooltip>
  )
}

export default CloseButton