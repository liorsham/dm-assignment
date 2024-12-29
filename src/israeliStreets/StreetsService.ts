import axios, { Axios } from 'axios';
import { omit } from 'lodash';
import { cities, City } from './cities';

function isCity(value: string): value is City {
	return Object.prototype.hasOwnProperty.call(cities, value);
  }

const englishNameByCity: Record<string, string> = Object.entries(cities)
	.reduce((acc, [eng, heb]) => ({ ...acc, [heb]: eng }), {});

export interface Street extends Omit<ApiStreet, '_id'>{
	streetId: number
}

interface ApiStreet{
	_id: number
	region_code: number
	region_name: string
	city_code: number
	city_name: string
	street_code: number
	street_name: string
	street_name_status: string
	official_code: number
}


export class StreetsService{
	private static _axios: Axios
	private static get axios(){
		if(!this._axios){
			this._axios = axios.create({})
		}
		return this._axios
	}
	static async getStreetsInCity(city: City): Promise<{city: City, streets: ApiStreet[]}>{
		if (!isCity(city)) {
			throw new Error(`${city} is not a valid city.`);
		}
		const res = (await this.axios.post('https://data.gov.il/api/3/action/datastore_search', {resource_id:`1b14e41c-85b3-4c21-bdce-9fe48185ffca`, filters: {city_name: cities[city]}, limit: 100000})).data
		const results = res.result.records
		console.log("received this results", {results});
		
		if (!results || !results.length) {
			throw new Error('No streets found for city: ' + city)
		}
		return {city, streets: results}
	}

	static async getStreetInfoById(id: number){
		const res = (await this.axios.post('https://data.gov.il/api/3/action/datastore_search', {resource_id:`1b14e41c-85b3-4c21-bdce-9fe48185ffca`, filters: {_id: id}, limit: 1})).data
		const results = res.result.records
		if (!results || !results.length) {
			throw new Error('No street found for id: ' + id)
		}
		const dbStreet: ApiStreet = results[0]
		const cityName = englishNameByCity[dbStreet.city_name]
		const street: Street = {
			...omit(dbStreet, '_id'),
			streetId: dbStreet._id,
			city_name: cityName,
			region_name: dbStreet.region_name.trim(),
			street_name: dbStreet.street_name.trim(),
			city_code: dbStreet.city_code,
			street_code: dbStreet.street_code,
			street_name_status: dbStreet.street_name_status,
			official_code: dbStreet.official_code,
			region_code: dbStreet.region_code
		}
		return street
	}
}