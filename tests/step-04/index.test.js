const readCSV = require('../../src/csvReader');
const parseQuery = require('../../src/queryParser');
const executeSELECTQuery = require('../../src/index');

test('Read CSV File', async () => {
    const data = await readCSV('./sample.csv');
    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBe(3);
    expect(data[0].name).toBe('Vansh');
    expect(data[0].age).toBe('21');
});

test('Parse SQL Query', () => {
    const query = 'SELECT id, name FROM sample';
    const parsed = parseQuery(query);
    expect(parsed).toEqual({
        fields: ['id', 'name'],
        joinCondition: null,
        joinTable: null,
        table: 'sample'
    });
});

test('Execute SQL Query', async () => {
    const query = 'SELECT id, name FROM sample';
    const result = await executeSELECTQuery(query);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).not.toHaveProperty('age');
    expect(result[0]).toEqual({ id: '1', name: 'Vansh' });
});