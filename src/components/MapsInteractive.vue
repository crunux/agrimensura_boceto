<script setup lang="ts">
  import { ref, computed } from 'vue'

  const projectInfo = ref({
    name: 'Proyecto Residencial Camino de Hacienda',
    description: 'Desarrollo inmobiliario moderno con excelente ubicación y accesibilidad',
    location: 'Sector Central, Ciudad',
    totalArea: '45,000',
    avgPrice: '50,000'
  })

  interface Parcel {
    id: number
    x: number
    y: number
    width: number
    height: number
    area: number
    price: number
    available: boolean
  }

  const parcels = ref<Parcel[]>([
    // Sector 1: Izquierda Superior (12 parcelas)
    ...Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      x: 70 + (i % 4) * 32,
      y: 100 + Math.floor(i / 4) * 35,
      width: 28,
      height: 30,
      area: 145,
      price: 32000,
      available: Math.random() > 0.3
    })),
    // Sector 2: Centro (9 parcelas)
    ...Array.from({ length: 9 }, (_, i) => ({
      id: i + 13,
      x: 250 + (i % 3) * 40,
      y: 120 + Math.floor(i / 3) * 50,
      width: 35,
      height: 45,
      area: 280,
      price: 62000,
      available: Math.random() > 0.3
    })),
    // Sector 3: Derecha Inferior (6 parcelas)
    { id: 22, x: 340, y: 320, width: 38, height: 50, area: 220, price: 48000, available: true },
    { id: 23, x: 385, y: 320, width: 38, height: 50, area: 220, price: 48000, available: false },
    { id: 24, x: 340, y: 375, width: 38, height: 45, area: 200, price: 44000, available: true },
    { id: 25, x: 385, y: 375, width: 38, height: 45, area: 200, price: 44000, available: true },
    { id: 26, x: 295, y: 320, width: 38, height: 50, area: 220, price: 48000, available: true },
    { id: 27, x: 295, y: 375, width: 38, height: 45, area: 200, price: 44000, available: false }
  ])

  const selectedParcel = ref<Parcel>()

  const availableParcels = computed(() => parcels.value.filter(p => p.available).length)
  const soldParcels = computed(() => parcels.value.filter(p => !p.available).length)

  const selectParcel = (id: number): void => {
    selectedParcel.value = parcels.value.find(p => p.id === id)
  }

  const getParcelsData = (id: number): Parcel => {
    return parcels.value.find(p => p.id === id)!
  }
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Navbar -->
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold text-blue-600">Proyecto Inmobiliario</div>
        <div class="flex gap-8">
          <a href="#"
            class="text-gray-700 hover:text-blue-600 font-medium">Home</a>
          <a href="#"
            class="text-gray-700 hover:text-blue-600 font-medium">Proyectos</a>
          <a href="#"
            class="text-gray-700 hover:text-blue-600 font-medium">Contacto</a>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Información del Proyecto -->
      <div class="bg-gradient-to-r from-green-400 to-green-500 rounded-lg shadow-lg p-6 mb-8">
        <h1 class="text-3xl font-bold text-white">{{ projectInfo.name }}</h1>
        <p class="text-white mt-2">{{ projectInfo.description }}</p>
      </div>

      <div class="grid grid-cols-3 gap-6 mb-8">
        <!-- Información Proyecto (Izquierda) -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Información del Proyecto</h2>
          <div class="space-y-3 text-sm">
            <p><strong>Ubicación:</strong> {{ projectInfo.location }}</p>
            <p><strong>Total Parcelas:</strong> {{ parcels.length }}</p>
            <p><strong>Disponibles:</strong> <span class="text-green-600 font-bold">{{ availableParcels }}</span></p>
            <p><strong>Vendidas:</strong> <span class="text-red-600 font-bold">{{ soldParcels }}</span></p>
            <p><strong>Área Total:</strong> {{ projectInfo.totalArea }} m²</p>
            <p><strong>Precio Promedio:</strong> ${{ projectInfo.avgPrice }}</p>
          </div>
        </div>

        <!-- Mapa SVG (Centro) -->
        <div class="bg-white rounded-lg shadow-lg p-6 col-span-2">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Mapa del Proyecto</h2>
          <svg viewBox="0 0 600 500"
            class="w-full h-auto border-2 border-gray-200 rounded">
            <!-- Fondo -->
            <rect width="600"
              height="500"
              fill="#f5f5f0" />

            <!-- BORDE DEL TERRENO (forma irregular púrpura) -->
            <path
              d="M 50 80 L 120 60 Q 180 40 220 50 L 280 45 Q 340 40 380 60 L 420 70 Q 450 80 480 100 L 520 140 Q 540 170 545 210 L 548 260 Q 550 310 540 350 L 520 390 Q 500 420 460 440 L 400 460 L 320 470 L 240 468 L 150 460 L 80 450 Q 50 445 45 410 L 40 350 Q 35 300 40 250 L 42 200 Q 45 140 50 80 Z"
              fill="none"
              stroke="#a855f7"
              stroke-width="3" />

            <!-- CAMINOS/VÍAS (gris) -->
            <g stroke="#999999"
              stroke-width="8"
              fill="none"
              opacity="0.7">
              <!-- Carreteras principales -->
              <path d="M 50 200 Q 150 180 280 190" />
              <path d="M 280 120 Q 320 150 330 240" />
              <path d="M 350 80 Q 420 180 470 300" />
              <path d="M 420 400 Q 350 410 250 420" />
            </g>

            <!-- ÁREA VERDE (bosque) -->
            <g opacity="0.6">
              <ellipse cx="480"
                cy="140"
                rx="60"
                ry="80"
                fill="#4ade80"
                opacity="0.5" />
              <!-- Puntos de árbol -->
              <circle cx="460"
                cy="110"
                r="3"
                fill="#22c55e" />
              <circle cx="475"
                cy="100"
                r="3"
                fill="#22c55e" />
              <circle cx="495"
                cy="105"
                r="3"
                fill="#22c55e" />
              <circle cx="510"
                cy="120"
                r="3"
                fill="#22c55e" />
              <circle cx="505"
                cy="140"
                r="3"
                fill="#22c55e" />
              <circle cx="490"
                cy="155"
                r="3"
                fill="#22c55e" />
              <circle cx="475"
                cy="160"
                r="3"
                fill="#22c55e" />
              <circle cx="465"
                cy="145"
                r="3"
                fill="#22c55e" />
              <circle cx="485"
                cy="130"
                r="3"
                fill="#22c55e" />
              <circle cx="470"
                cy="130"
                r="3"
                fill="#22c55e" />
            </g>

            <!-- PARCELAS CON INTERACTIVIDAD -->
            <g id="parcels">
              <!-- Sector 1: Izquierda Superior (12 parcelas 4x3) -->
              <g class="parcel-group">
                <!-- Fila 1 -->
                <rect v-for="i in [1, 2, 3, 4]"
                  :key="i"
                  :x="70 + (i - 1) * 32"
                  y="100"
                  width="28"
                  height="30"
                  :fill="getParcelsData(i).available ? '#d4f4dd' : '#fcd4d4'"
                  stroke="#d084c9"
                  stroke-width="2"
                  class="cursor-pointer hover:opacity-80"
                  @click="selectParcel(i)" />
                <!-- Fila 2 -->
                <rect v-for="i in [5, 6, 7, 8]"
                  :key="i"
                  :x="70 + (i - 5) * 32"
                  y="135"
                  width="28"
                  height="30"
                  :fill="getParcelsData(i).available ? '#d4f4dd' : '#fcd4d4'"
                  stroke="#d084c9"
                  stroke-width="2"
                  class="cursor-pointer hover:opacity-80"
                  @click="selectParcel(i)" />
                <!-- Fila 3 -->
                <rect v-for="i in [9, 10, 11, 12]"
                  :key="i"
                  :x="70 + (i - 9) * 32"
                  y="170"
                  width="28"
                  height="30"
                  :fill="getParcelsData(i).available ? '#d4f4dd' : '#fcd4d4'"
                  stroke="#d084c9"
                  stroke-width="2"
                  class="cursor-pointer hover:opacity-80"
                  @click="selectParcel(i)" />
              </g>

              <!-- Sector 2: Centro (parcelas medianas 3x3) -->
              <g class="parcel-group">
                <!-- Fila 1 -->
                <rect v-for="i in [13, 14, 15]"
                  :key="i"
                  :x="250 + (i - 13) * 40"
                  y="120"
                  width="35"
                  height="45"
                  :fill="getParcelsData(i).available ? '#d4f4dd' : '#fcd4d4'"
                  stroke="#d084c9"
                  stroke-width="2"
                  class="cursor-pointer hover:opacity-80"
                  @click="selectParcel(i)" />
                <!-- Fila 2 -->
                <rect v-for="i in [16, 17, 18]"
                  :key="i"
                  :x="250 + (i - 16) * 40"
                  y="170"
                  width="35"
                  height="45"
                  :fill="getParcelsData(i).available ? '#d4f4dd' : '#fcd4d4'"
                  stroke="#d084c9"
                  stroke-width="2"
                  class="cursor-pointer hover:opacity-80"
                  @click="selectParcel(i)" />
                <!-- Fila 3 -->
                <rect v-for="i in [19, 20, 21]"
                  :key="i"
                  :x="250 + (i - 19) * 40"
                  y="220"
                  width="35"
                  height="45"
                  :fill="getParcelsData(i).available ? '#d4f4dd' : '#fcd4d4'"
                  stroke="#d084c9"
                  stroke-width="2"
                  class="cursor-pointer hover:opacity-80"
                  @click="selectParcel(i)" />
              </g>

              <!-- Sector 3: Derecha Inferior (parcelas variadas) -->
              <g class="parcel-group">
                <rect v-for="i in [22, 23, 24, 25, 26, 27]"
                  :key="i"
                  :x="getParcelsData(i).x"
                  :y="getParcelsData(i).y"
                  :width="getParcelsData(i).width"
                  :height="getParcelsData(i).height"
                  :fill="getParcelsData(i).available ? '#d4f4dd' : '#fcd4d4'"
                  stroke="#d084c9"
                  stroke-width="2"
                  class="cursor-pointer hover:opacity-80"
                  @click="selectParcel(i)" />
              </g>
            </g>

            <!-- Números de parcela y área -->
            <g class="text-xs font-bold fill-red-600"
              v-for="p in parcels"
              :key="`label-${p.id}`">
              <text :x="p.x + p.width / 2"
                :y="p.y + p.height / 2 - 3"
                text-anchor="middle"
                font-size="10">P{{ p.id }}</text>
              <text :x="p.x + p.width / 2"
                :y="p.y + p.height / 2 + 10"
                text-anchor="middle"
                font-size="8">{{ p.area }}m²</text>
            </g>

            <!-- Estrella azul (ubicación) -->
            <g class="location-marker">
              <circle cx="120"
                cy="75"
                r="6"
                fill="none"
                stroke="#3b82f6"
                stroke-width="2" />
              <polygon points="120,65 126,78 113,78"
                fill="#3b82f6" />
            </g>

            <!-- Etiqueta acceso -->
            <text x="500"
              y="470"
              font-size="12"
              fill="#a855f7"
              font-weight="bold">ACCESO PROYECTO</text>
          </svg>
        </div>
      </div>

      <!-- Información de Parcela Seleccionada -->
      <div class="grid grid-cols-2 gap-6 mb-8">
        <div v-if="selectedParcel"
          class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Parcela Seleccionada</h2>
          <div class="space-y-2 text-sm">
            <p><strong>ID:</strong> P{{ selectedParcel.id }}</p>
            <p><strong>Área:</strong> {{ selectedParcel.area }} m²</p>
            <p><strong>Precio:</strong> ${{ selectedParcel.price.toLocaleString() }}</p>
            <p><strong>Estado:</strong>
              <span :class="selectedParcel.available ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">
                {{ selectedParcel.available ? 'Disponible' : 'Vendida' }}
              </span>
            </p>
            <button v-if="selectedParcel.available"
              class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
              Contactar
            </button>
          </div>
        </div>

        <!-- Galería de Imágenes -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Galería</h2>
          <div class="grid grid-cols-3 gap-3">
            <img v-for="i in 6"
              :key="i"
              :src="`/placeholder.svg?height=100&width=100&query=proyecto-imagen-${i}`"
              alt="Proyecto"
              class="rounded cursor-pointer hover:opacity-75 transition" />
          </div>
        </div>
      </div>

      <!-- Google Maps -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Ubicación</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509127!2d-74.00601!3d40.71282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a27a46fb973%3A0x6efd3d6e4204c8dc!2sNew%20York%2C%20NY%2010007!5e0!3m2!1ses!2sus!4v1234567890123"
          width="100%"
          height="400"
          style="border:0;"
          loading="lazy"
          class="rounded" />
      </div>
    </div>
  </div>
</template>
<style scoped>
  svg {
    transition: all 0.3s ease;
  }

  rect:hover {
    filter: brightness(0.9);
  }
</style>
