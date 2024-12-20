import { useSelector } from 'react-redux';
import { selectConfigs } from '../../store/ConfigurationReducer/configuration.selector'


export default function DisplayAllConfigs() {

    const configs = useSelector(selectConfigs)
    console.log("************* received configs",configs)
  return (
    <div>DisplayAllConfigs</div>
  )
}
