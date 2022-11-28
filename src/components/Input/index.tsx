import React from 'react';

import styles from './styles.module.scss';

interface InputProps {
    haserror: boolean
    password?: boolean
    placeholder?: string
    label?: string
}

const Input: React.FC<InputProps & React.HTMLProps<HTMLInputElement>> = (props) => {
    if (props.password) {
        return (
            <div className={`${styles.input} ${props.haserror && styles.inputAttentionField}`}>
                <label htmlFor="password" className={styles.label}>Senha</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Informe sua senha"
                    required
                    autoComplete="current-password"
                    onChange={props.onChange}
                    onClick={props.onClick}
                />
                {props.haserror &&
                    <small>Por favor, preencha este campo corretamente.</small>
                }
            </div>
        );
    } else {
        return (
            <div className={`${styles.input} ${props.haserror && styles.inputAttentionField}`}>
                <label htmlFor="text" className={styles.label}>
                    {!props.label ? "Texto" : props.label}
                </label>
                <input
                    id="text"
                    type="text"
                    placeholder={!props.placeholder ? "Texto" : props.placeholder}
                    required
                    autoComplete="username"
                    onChange={props.onChange}
                    onClick={props.onClick}
                />
                {props.haserror &&
                    <small>Por favor, preencha este campo corretamente.</small>
                }
            </div>
        );
    }
}

export default Input;