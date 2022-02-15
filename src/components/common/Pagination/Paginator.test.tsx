import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Paginator} from './Paginator';

const setCurrentPage = jest.fn();

it('should be render', () => {
    render(<Paginator
        currentPage={1}
        totalItems={200}
        setCurrentPage={setCurrentPage}
        />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
});

it('should be change part', () => {
    render(<Paginator
        currentPage={1}
        totalItems={200}
        setCurrentPage={setCurrentPage}
    />);

    userEvent.click(screen.getByText('>'));

    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();

    userEvent.click(screen.getByText('<'));

    expect(screen.queryByText('<')).not.toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
});

it('should be change page', () => {
    render(<Paginator
        currentPage={1}
        totalItems={200}
        setCurrentPage={setCurrentPage}
    />);

    userEvent.click(screen.getByText('3'));

    expect(setCurrentPage).toBeCalledWith(3);
});

it('Paginator snapshot', () => {
    const view = render(<Paginator
        currentPage={1}
        totalItems={200}
        setCurrentPage={setCurrentPage}
    />);

    expect(view).toMatchSnapshot();
});