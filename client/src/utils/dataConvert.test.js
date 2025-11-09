import { convertDate } from './dataConvert';
describe('convertDate function', () => {

    it('should correctly format a valid ISO date string', () => {
        const isoString = '2025-12-01T10:00:00.000Z';

        const result = convertDate(isoString);

        expect(result).toBe('01.12.2025');
    });

    it('should handle another valid date format', () => {
        const anotherDate = 'January 20, 2024';

        const result = convertDate(anotherDate);

        expect(result).toBe('20.01.2024');
    });
});