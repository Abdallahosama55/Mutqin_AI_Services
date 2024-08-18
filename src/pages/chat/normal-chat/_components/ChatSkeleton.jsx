import React from 'react';
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: flex-start;
    width: 85%;
`

function ChatSkeleton() {
    return (
        <>
            <Row>
                <Skeleton circle={true} height={40} width={40}/>
                <div>
                    <Skeleton height={10} width={460}/>
                    <Skeleton height={10} width={280}/>
                </div>
            </Row>
            <Row>
                <Skeleton circle={true} height={40} width={40}/>
                <div>
                    <Skeleton height={10} width={500}/>
                    <Skeleton height={10} width={500}/>
                    <Skeleton height={10} width={500}/>
                    <Skeleton height={10} width={200}/>
                </div>
            </Row>
            <Row>
                <Skeleton circle={true} height={40} width={40}/>
                <div>
                    <Skeleton height={10} width={300}/>
                </div>
            </Row>
            <Row>
                <Skeleton circle={true} height={40} width={40}/>
                <div>
                    <Skeleton height={10} width={110}/>
                    <Skeleton height={10} width={310}/>
                    <Skeleton height={10} width={400}/>
                    <Skeleton height={10} width={200}/>
                </div>
            </Row>
        </>
    );
}

export default ChatSkeleton;