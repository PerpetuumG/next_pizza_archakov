import React, {FC} from 'react';
import {cn} from "@/shared/lib/utils";
import {useForm} from "react-hook-form";

interface Props {
    className?: string;
    onClose?: VoidFunction;
}

export const LoginForm: FC<Props> = ({className, onClose}) => {
    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    return (
        <div className={cn('', className)}>

        </div>
    );
};
