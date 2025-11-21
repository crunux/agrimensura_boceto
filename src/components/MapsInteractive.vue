<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-gray-50">
    <!-- Navbar -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="text-2xl font-bold text-green-700">BuildHub</div>
        <ul class="flex gap-8">
          <li><a href="#home"
              class="text-gray-700 hover:text-green-700 transition">Home</a></li>
          <li><a href="#proyectos"
              class="text-gray-700 hover:text-green-700 transition">Proyectos</a></li>
          <li><a href="#contacto"
              class="text-gray-700 hover:text-green-700 transition">Contacto</a></li>
        </ul>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-8 space-y-6">
      <!-- Título del Proyecto -->
      <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h1 class="text-3xl font-bold text-gray-900">{{ selectedProject.name }}</h1>
        <p class="text-gray-600 mt-2">{{ selectedProject.description }}</p>
      </div>

      <!-- Contenedor Principal -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Columna Izquierda -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Info Proyecto -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200 shadow-sm">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Información del Proyecto</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-700">Ubicación:</span>
                <span class="font-semibold text-gray-900">{{ selectedProject.location }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Área Total:</span>
                <span class="font-semibold text-gray-900">{{ selectedProject.totalArea }} m²</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Parcelas:</span>
                <span class="font-semibold text-gray-900">{{ parcels.length }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Disponibles:</span>
                <span class="font-semibold text-green-600">{{ availableParcels }}</span>
              </div>
            </div>
          </div>

          <!-- Info Parcela Seleccionada -->
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200 shadow-sm">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Parcela Seleccionada</h3>
            <div v-if="selectedParcel"
              class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-700">Parcela:</span>
                <span class="font-semibold text-gray-900">#{{ selectedParcel.id }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Área:</span>
                <span class="font-semibold text-gray-900">{{ selectedParcel.area }} m²</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Precio:</span>
                <span class="font-semibold text-gray-900">${{ selectedParcel.price.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Estado:</span>
                <span :class="[
                  'font-semibold',
                  selectedParcel.available ? 'text-green-600' : 'text-red-600'
                ]">
                  {{ selectedParcel.available ? 'Disponible' : 'Vendida' }}
                </span>
              </div>
              <button v-if="selectedParcel.available"
                class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition mt-4">
                Contactar
              </button>
            </div>
            <div v-else
              class="text-gray-600 text-center py-4">
              Selecciona una parcela en el mapa
            </div>
          </div>

          <!-- Mapa SVG Interactivo -->
          <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Mapa del Proyecto</h3>
            <svg viewBox="0 0 500 400"
              class="w-full border border-gray-300 rounded bg-gray-50">
              <!-- Delimitación del terreno -->
              <rect x="20"
                y="20"
                width="460"
                height="360"
                fill="none"
                stroke="#4B5563"
                stroke-width="3"
                rx="8" />

              <!-- Parcelas -->
              <g v-for="(parcel, index) in parcels"
                :key="index">
                <rect :x="parcel.x"
                  :y="parcel.y"
                  :width="parcel.width"
                  :height="parcel.height"
                  :fill="parcel.available ? '#10B981' : '#EF4444'"
                  stroke="#fff"
                  stroke-width="2"
                  @click="selectParcel(parcel)"
                  class="cursor-pointer opacity-80 hover:opacity-100 transition"
                  rx="4" />
                <text :x="parcel.x + parcel.width / 2"
                  :y="parcel.y + parcel.height / 2 + 5"
                  text-anchor="middle"
                  font-size="12"
                  fill="white"
                  font-weight="bold"
                  class="pointer-events-none">
                  {{ parcel.id }}
                </text>
              </g>
            </svg>

            <!-- Leyenda -->
            <div class="flex gap-6 mt-4 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-green-500 rounded"></div>
                <span>Disponible</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-red-500 rounded"></div>
                <span>Vendida</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna Derecha -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Galería de Imágenes -->
          <div class="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3 p-4">
              <div v-for="(image, index) in projectGallery"
                :key="index"
                class="relative group overflow-hidden rounded-lg">
                <img :src="image"
                  :alt="`Proyecto ${index + 1}`"
                  class="w-full h-48 object-cover group-hover:scale-110 transition duration-300" />
                <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition"></div>
              </div>
            </div>
          </div>

          <!-- Google Maps Iframe -->
          <div class="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.0859413355!2d-122.41941592346926!3d37.77492997102519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064b5c0a881%3A0xfe7ae2e80ab00b75!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="400"
              style="border:0;"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              class="w-full"></iframe>
          </div>

          <!-- Información Adicional -->
          <div class="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white shadow-sm">
            <h3 class="text-xl font-bold mb-3">¿Interesado?</h3>
            <p class="mb-4">Contáctanos para obtener más información sobre las parcelas disponibles.</p>
            <button class="bg-white text-green-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition">
              Solicitar Información
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  interface Parcela {
    id: number
    x: number
    y: number
    width: number
    height: number
    area: number
    price: number
    available: boolean
  }
  // Datos del proyecto
  const selectedProject = ref({
    name: 'Residencial Vista Verde',
    description: 'Proyecto inmobiliario de lujo con vistas panorámicas y amenidades de primera clase',
    location: 'Zona Metropolitana',
    totalArea: 15000
  })

  // Galería de imágenes
  const projectGallery = ref([
    '/placeholder.svg?height=200&width=200',
    '/placeholder.svg?height=200&width=200',
    '/placeholder.svg?height=200&width=200',
    '/placeholder.svg?height=200&width=200',
    '/placeholder.svg?height=200&width=200',
    '/placeholder.svg?height=200&width=200'
  ])

  // Datos de parcelas (mapa SVG)
  const parcels = ref<Parcela[]>([
    // Fila 1
    { id: 1, x: 40, y: 40, width: 85, height: 70, area: 200, price: 45000, available: true },
    { id: 2, x: 135, y: 40, width: 85, height: 70, area: 200, price: 45000, available: false },
    { id: 3, x: 230, y: 40, width: 85, height: 70, area: 200, price: 45000, available: true },
    { id: 4, x: 325, y: 40, width: 85, height: 70, area: 200, price: 45000, available: true },
    { id: 5, x: 420, y: 40, width: 40, height: 70, area: 100, price: 22500, available: false },
    // Fila 2
    { id: 6, x: 40, y: 120, width: 85, height: 70, area: 200, price: 45000, available: true },
    { id: 7, x: 135, y: 120, width: 85, height: 70, area: 200, price: 45000, available: true },
    { id: 8, x: 230, y: 120, width: 85, height: 70, area: 200, price: 45000, available: false },
    { id: 9, x: 325, y: 120, width: 85, height: 70, area: 200, price: 45000, available: true },
    { id: 10, x: 420, y: 120, width: 40, height: 70, area: 100, price: 22500, available: true },
    // Fila 3
    { id: 11, x: 40, y: 200, width: 85, height: 70, area: 200, price: 45000, available: true },
    { id: 12, x: 135, y: 200, width: 85, height: 70, area: 200, price: 45000, available: true },
    { id: 13, x: 230, y: 200, width: 85, height: 70, area: 200, price: 45000, available: false },
    { id: 14, x: 325, y: 200, width: 85, height: 70, area: 200, price: 45000, available: true },
    { id: 15, x: 420, y: 200, width: 40, height: 70, area: 100, price: 22500, available: true },
    // Fila 4
    { id: 16, x: 40, y: 280, width: 85, height: 70, area: 200, price: 45000, available: true },
    { id: 17, x: 135, y: 280, width: 85, height: 70, area: 200, price: 45000, available: false },
    { id: 18, x: 230, y: 280, width: 85, height: 70, area: 200, price: 45000, available: true },
    { id: 19, x: 325, y: 280, width: 85, height: 70, area: 200, price: 45000, available: true },
    { id: 20, x: 420, y: 280, width: 40, height: 70, area: 100, price: 22500, available: false }
  ])

  // Parcela seleccionada
  const selectedParcel = ref<Parcela>(
    
  )

  // Funciones
  const selectParcel = (parcel: Parcela) => {
    selectedParcel.value = parcel
  }

  // Computada para contar parcelas disponibles
  const availableParcels = computed(() => {
    return parcels.value.filter(p => p.available).length
  })
</script>

<style scoped>
  /* Estilos adicionales si es necesario */
</style>
