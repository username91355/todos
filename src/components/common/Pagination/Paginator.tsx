import React, {useState} from 'react';
import s from './Paginator.module.css';

interface IProps {
    currentPage: number
    totalItems: number
    setCurrentPage: (value: number) => void
}

export const Paginator: React.FC<IProps> = React.memo(props => {

    const {
        currentPage,
        totalItems,
        setCurrentPage
    } = props;

    const
        partsShow = 5,
        totalParts = Math.ceil(totalItems / 10),
        [portionNumber, setPortionNumber] = useState(1),
        leftPartBorder = (portionNumber - 1) * partsShow + 1,
        rightPartBorder = portionNumber * partsShow;

    let pages = [];

    for (let i = 1; i <= totalParts; i++) {
        pages.push(i);
    }

    const leftArrowHandle = () => {
        setPortionNumber(portionNumber - 1);
        setCurrentPage(currentPage - partsShow);
    };

    const rightArrowHandle = () => {
        setPortionNumber(portionNumber + 1);
        setCurrentPage(currentPage + partsShow);
    };

    return (
        <div className={s.pagination}>
            {portionNumber > 1 &&
                <button
                    className={s.pagination__button}
                    onClick={leftArrowHandle}
                >
                    {'<'}
                </button>
            }
            <div className={s.pagination__pages}>
                {
                    pages
                        .filter(i => i >= leftPartBorder && i <= rightPartBorder)
                        .map((i) => {

                            const selectCurrentPage = () => {
                                setCurrentPage(i);
                            };

                            return <div

                                key={i}
                                className={
                                    currentPage === i
                                        ? s.pagination__active
                                        : ''
                                }
                                onClick={selectCurrentPage}>{i}</div>
                        })
                }
            </div>
            {portionNumber < totalParts / partsShow &&
                <button
                    className={s.pagination__button}
                    onClick={rightArrowHandle}
                >
                    {'>'}
                </button>
            }
        </div>
    );
});