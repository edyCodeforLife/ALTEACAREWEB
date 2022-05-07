import { memo, useCallback, useState } from 'react';
import styled from 'styled-components';

import MaterialIcon from '@material/react-material-icon';

import { FlexOne, FlexRow } from '../flex';
import { BasicBtn } from './basic';

const WithShadow = styled.div`
    -webkit-box-shadow: 0px 0px 8px 2px rgba(189, 189, 189, 0.4);
    -moz-box-shadow: 0px 0px 8px 2px rgba(189, 189, 189, 0.4);
    box-shadow: 0px 0px 8px 2px rgba(189, 189, 189, 0.4);
`;

const Container = styled.div`
    position: relative;
`;

const AlertContainer = styled.div<any>`
    position: absolute;
    padding: 8px;
    z-index: ${props => (props.show === 'yes' ? '1' : '-1')};
    top: 0;
    font-size: 12px;
    right: -8px;
    background: #fff;
    overflow: hidden;
    max-width: ${props => (props.show === 'yes' ? props.maxWidth : '0')};
    transition: 0.3s max-width ease;
`;

const TextContainer = styled(WithShadow)`
    white-space: nowrap;
    z-index: 1;
    background: #fff;
    padding: 0 12px;
    border-radius: 12px;
    height: 22px;
    line-height: 22px;
`;

const ButtonContainer = styled(WithShadow)`
    margin-left: 6px;
    cursor: pointer;
    outline: none;
    width: 22px;
    height: 22px;
    line-height: 22px;
    border-radius: 12px;
    background: #fff;
    z-index: 1;
    text-align: center;
    & > i {
        font-size: 16px;
        vertical-align: middle;
    }
`;

function _ConfirmButton(props: { children: any; onClick: any; text: string }) {
    const [confirmShow, setConfirmShow] = useState(false);

    const onFirstClick = useCallback(() => {
        setConfirmShow(true);
    }, []);

    const onOK = useCallback(
        evt => {
            props.onClick && props.onClick(evt);
            setConfirmShow(false);
        },
        [props]
    );

    const onCancel = useCallback(() => {
        setConfirmShow(false);
    }, []);

    return (
        <Container>
            <AlertContainer
                show={confirmShow ? 'yes' : 'no'}
                maxWidth={`${14 * props.text.length}px`}
            >
                <FlexRow>
                    <FlexOne>
                        <TextContainer>{props.text}</TextContainer>
                    </FlexOne>
                    <ButtonContainer onClick={onOK}>
                        <MaterialIcon icon={'done'} />
                    </ButtonContainer>
                    <ButtonContainer
                        style={{ background: '#50c878' }}
                        onClick={() => {
                            onCancel();
                        }}
                    >
                        <MaterialIcon style={{ color: '#fff' }} icon={'clear'} />
                    </ButtonContainer>
                </FlexRow>
            </AlertContainer>
            <BasicBtn onClick={onFirstClick}>{props.children}</BasicBtn>
        </Container>
    );
}

export const ConfirmButton = memo(_ConfirmButton);
