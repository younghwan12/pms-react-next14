/**
 * 숫자 포맷 1000000 -> 1,000,000
 * @param n 숫자 number or String
 * @returns 천자리마다 , 찍어서 리턴
 */
export const numberFormat = (n: string | number): string => {
    /*     const targetNumber = parseInt(n); */
    const targetNumber = parseInt(n.toString()); // 수정 후
    return Intl.NumberFormat().format(targetNumber).toString();
};
