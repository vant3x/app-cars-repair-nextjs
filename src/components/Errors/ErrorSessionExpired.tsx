import { Alert } from "@mui/material";

interface Props {
    message: string;
}

export const ErrorSessionExpired = ({message}: Props) => {
    return (
        <>
        <Alert severity="error">{message}</Alert>
        </>
    );
}

