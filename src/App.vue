<script setup lang="ts">
import {ref} from "vue";
import {ElTable, ElTableColumn} from "element-plus"
import {poissonTable} from "@/poisson";
import {generate} from "@/index";
const parkingLotFreeSpaces = ref(6)
const simulatedHours = ref(10)
console.log(poissonTable)
const tableData = poissonTable.rows.map(row => ({
	n: row.n,
	from: row.numberRange.from.toFixed(5),
	to: row.numberRange.to.toFixed(5)
}))
const integrantes = [
	{name: 'Axel Ivan Morales Ortega', enrollment: '1911084'},
	{name: 'Devany Magaly Flores López', enrollment: '1918077'},
	{name: 'Jose Angel Nambo Moreno', enrollment: '1850769'},
	{name: 'Alejandro Abeldano Rodriguez', enrollment: '1911151'},
	{name: 'Erick Brandon Garcia Castillo', enrollment: '1796004'},
	{name: 'Emiliano Juan Garcia Garcia', enrollment: '1922887'},
	{name: 'Kevin Alan Correa García', enrollment: '1905149'},
	{name: 'Luisa Fernanda Salazar Mauricio', enrollment: '1918943'},
	{name: 'Daniel Jafet De León Nolazco', enrollment: '1918943'},
	{name: 'Edgar Iván Hernández Hernández', enrollment: '1814860'},
]
const {
	totalCarsThatCouldPark,
	percentAvailability,
	averageTotalCars
} = generate(43800)
</script>
<template>
	<div class="flex flex-col justify-center items-center md:p-16 lg:p-20">
		<div class="flex flex-col items-center mb-20">
			<h1 class="text-2xl font-bold text-gray-700 uppercase text-center">Modelado y Simulación de Sistemas - PIA</h1>
			<h1 class="text-xl font-bold text-gray-600 text-center">Problema 14</h1>
			<h1 class="text-xl font-bold text-gray-600 mt-8">INTEGRANTES</h1>
			<el-table :data="integrantes" stripe style="width: 100%">
				<el-table-column prop="name" label="Nombre"/>
				<el-table-column prop="enrollment" label="Matrícula"/>
			</el-table>
		</div>
		<h1 class="text-lg font-bold text-gray-600  uppercase mb-4 m">Resultado</h1>
		<div class="mb-10">
			<p class="text-center">Fueron al establecimiento un total de <span
				class="text-green-800 font-bold">{{ averageTotalCars }}</span></p>
			<p class="text-center">de los cuales <span class="text-green-800 font-bold">{{ totalCarsThatCouldPark }}</span>
				pudieron estacionarse</p>
			<p class="text-center"> y <span class="text-green-800 font-bold">{{
					averageTotalCars - totalCarsThatCouldPark
				}}</span> no</p>
		</div>

		<div class="mb-20">
			<p class="text-center">
				<span class="text-sm font-bold text-gray-500">RESPUESTA 1: </span> Un
				{{ (((averageTotalCars - totalCarsThatCouldPark) / totalCarsThatCouldPark) * 100).toFixed(5) }}% no pudo estacionarse
			</p>
			<p class="text-center">
				<span class="text-sm font-bold text-gray-500">RESPUESTA 2: </span> La probabilidad de encontrar un espacio de estacionamiento
				es de {{ 100 - (((averageTotalCars - totalCarsThatCouldPark) / totalCarsThatCouldPark) * 100).toFixed(5) }}%
			</p>
			<p class="text-center">
				<span class="text-sm font-bold text-gray-500">RESPUESTA 2: </span> El porcentaje promedio de espacios disponibles
				es de {{ percentAvailability.toFixed(5) }}%
			</p>
		</div>

		<h1 class="text-lg font-bold text-gray-600  uppercase mb-4">Tabla de poisson</h1>
		<el-table :data="tableData" stripe style="width: 100%">
			<el-table-column prop="n" label="Total de autos"/>
			<el-table-column prop="from" label="f(xi)"/>
			<el-table-column prop="to" label="F(xi)"/>
		</el-table>
	</div>
</template>