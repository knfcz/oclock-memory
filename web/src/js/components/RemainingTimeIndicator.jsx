import React, { useEffect, useState } from 'react';

const RemainingTimeIndicator = props => {
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    const durationInSeconds = props.duration / 1000;
    const loadingPercentage = (secondsElapsed * 100) / durationInSeconds;

    useEffect(() => {
        const refreshTimeout = setTimeout(() => {
            setSecondsElapsed(secondsElapsed + 1);
        }, 1000);

        return () => {
            clearTimeout(refreshTimeout);
        };
    }, [secondsElapsed]);

    return (
        <div className={'loading-bar-container'}>
            <div
                className="loading-bar"
                style={{ width: `${loadingPercentage}%` }}
            />

            <span>{durationInSeconds - secondsElapsed}</span>
        </div>
    );
};

export default RemainingTimeIndicator;
