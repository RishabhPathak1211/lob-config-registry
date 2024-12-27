import { LoaderProps} from '@mantine/core'
import CircularProgress from '@mui/material/CircularProgress';

export function Loader(_props: LoaderProps) {
    return (
        <div className={"loader-container"}>
      <CircularProgress />
        </div>
    );

}
