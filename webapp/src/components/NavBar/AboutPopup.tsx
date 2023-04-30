import { useTranslation } from "react-i18next"
import NavPopup from "../NavPopup"
import { GitHubIcon, GitHubLink, GitHubText, Table } from "./Styles"

type PopupProps = {
  isOpen: boolean
  close: () => void 
}

const NavAboutPopup = ({ isOpen, close }: PopupProps) => {
  const { t } = useTranslation()
  return (
    <NavPopup isOpen={isOpen} closePopup={close}>
      <h1>{ t('aboutPopup.title') }</h1>
      <p>{ t('aboutPopup.subtitle') }</p>
      <Table>
        <thead>
          <tr>
            <th>{ t('aboutPopup.table_header.name') }</th>
            <th>UO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Álvaro Dávila Sampedro</td>
            <td>UO284548</td>
          </tr>
          <tr>
            <td>Adrián Martínez Rodríguez</td>
            <td>UO284163</td>
          </tr>
          <tr>
            <td>Hugo Roberto Pulido Pensado</td>
            <td>UO282823</td>
          </tr>
          <tr>
            <td>Javier González Velázquez</td>
            <td>UO276803</td>
          </tr>   
        </tbody>
      </Table>
      <GitHubLink href="https://github.com/Arquisoft/lomap_es2b" target="_blank" rel="noopener noreferrer">
        <GitHubIcon src="https://img.icons8.com/ios-glyphs/30/000000/github.png" />
        <GitHubText>Lomap_es2b</GitHubText>
      </GitHubLink>
    </NavPopup>
  )
}

export default NavAboutPopup