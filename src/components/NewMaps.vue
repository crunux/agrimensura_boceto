<script setup lang="ts">
  import { ref, computed } from 'vue'

  interface Parcel {
    id: string
    x: number
    y: number
    width: number
    height: number
    area: number
    price: number
    available: boolean
  }

  const selectedParcel = ref<Parcel>()

  // Generate parcels grid
  const parcels = ref<Parcel[]>([
    // Row 1
    { id: 'P01', x: 40, y: 40, width: 100, height: 80, area: 800, price: 2000000, available: true },
    { id: 'P02', x: 150, y: 40, width: 100, height: 80, area: 800, price: 2000000, available: true },
    { id: 'P03', x: 260, y: 40, width: 100, height: 80, area: 800, price: 2000000, available: false },
    { id: 'P04', x: 370, y: 40, width: 100, height: 80, area: 800, price: 2000000, available: true },
    { id: 'P05', x: 480, y: 40, width: 100, height: 80, area: 800, price: 2000000, available: true },

    // Row 2
    { id: 'P06', x: 40, y: 130, width: 100, height: 80, area: 800, price: 2000000, available: true },
    { id: 'P07', x: 150, y: 130, width: 100, height: 80, area: 800, price: 2000000, available: false },
    { id: 'P08', x: 260, y: 130, width: 100, height: 80, area: 800, price: 2000000, available: true },
    { id: 'P09', x: 370, y: 130, width: 100, height: 80, area: 800, price: 2000000, available: true },
    { id: 'P10', x: 480, y: 130, width: 100, height: 80, area: 800, price: 2000000, available: true },

    // Row 3
    { id: 'P11', x: 40, y: 220, width: 100, height: 80, area: 800, price: 2000000, available: true },
    { id: 'P12', x: 150, y: 220, width: 100, height: 80, area: 800, price: 2000000, available: true },
    { id: 'P13', x: 260, y: 220, width: 100, height: 80, area: 800, price: 2000000, available: false },
    { id: 'P14', x: 370, y: 220, width: 100, height: 80, area: 800, price: 2000000, available: true },
    { id: 'P15', x: 480, y: 220, width: 100, height: 80, area: 800, price: 2000000, available: true },

    // Row 4
    { id: 'P16', x: 40, y: 310, width: 100, height: 80, area: 800, price: 2000000, available: true },
    { id: 'P17', x: 150, y: 310, width: 100, height: 80, area: 800, price: 2000000, available: true },
    { id: 'P18', x: 260, y: 310, width: 100, height: 80, area: 800, price: 2000000, available: true },
    { id: 'P19', x: 370, y: 310, width: 100, height: 80, area: 800, price: 2000000, available: false },
    { id: 'P20', x: 480, y: 310, width: 100, height: 80, area: 800, price: 2000000, available: true },
  ])

  const totalParcels = computed(() => parcels.value.length)
  const availableParcels = computed(() =>
    parcels.value.filter(p => p.available).length
  )

  const selectParcel = (parcel: Parcel) => {
    selectedParcel.value = parcel
  }
</script>
<template>
  <div class="min-h-screen bg-slate-900 text-white font-sans">
    <!-- NAVBAR -->
    <nav class="bg-slate-800 border-b border-slate-700">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="text-2xl font-bold text-emerald-500">ProyectoHub</div>
        <div class="flex gap-8">
          <a href="#"
            class="hover:text-emerald-400 transition">Inicio</a>
          <a href="#"
            class="hover:text-emerald-400 transition">Proyectos</a>
          <a href="#"
            class="hover:text-emerald-400 transition">Contacto</a>
        </div>
      </div>
    </nav>

    <!-- MAIN CONTAINER -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- INFO BOXES -->
      <div class="grid grid-cols-2 gap-6 mb-8">
        <!-- Project Info -->
        <div class="bg-slate-800 border-2 border-emerald-500 rounded-lg p-6">
          <h3 class="text-lg font-semibold mb-4 text-emerald-400">Información del Proyecto</h3>
          <div class="space-y-2 text-sm text-slate-300">
            <p><strong>Nombre:</strong> Residencial Monte Verde</p>
            <p><strong>Ubicación:</strong> Sector La Montaña</p>
            <p><strong>Área Total:</strong> 45,000 m²</p>
            <p><strong>Parcelas Disponibles:</strong> {{ availableParcels }}/{{ totalParcels }}</p>
            <p><strong>Precio Promedio:</strong> $2,500 por m²</p>
          </div>
        </div>

        <!-- Selected Parcel Info -->
        <div class="bg-slate-800 border-2 border-emerald-500 rounded-lg p-6">
          <h3 class="text-lg font-semibold mb-4 text-emerald-400">Información de la Parcela</h3>
          <div v-if="selectedParcel"
            class="space-y-2 text-sm text-slate-300">
            <p><strong>ID:</strong> {{ selectedParcel.id }}</p>
            <p><strong>Área:</strong> {{ selectedParcel.area }} m²</p>
            <p><strong>Estado:</strong>
              <span :class="selectedParcel.available ? 'text-emerald-400' : 'text-red-400'">
                {{ selectedParcel.available ? 'Disponible' : 'No Disponible' }}
              </span>
            </p>
            <p v-if="selectedParcel.available"><strong>Precio:</strong> ${{ selectedParcel.price }}</p>
            <button v-if="selectedParcel.available"
              class="mt-4 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded transition">
              Contactar
            </button>
          </div>
          <div v-else
            class="text-slate-400 text-center py-8">
            Selecciona una parcela para ver detalles
          </div>
        </div>
      </div>

      <!-- MAIN GRID -->
      <div class="grid grid-cols-3 gap-6 mb-8">
        <!-- PROJECT MAP (SVG) -->
        <div class="col-span-2 bg-slate-800 border-2 border-slate-700 rounded-lg p-6">
          <h3 class="text-lg font-semibold mb-4 text-emerald-400">Mapa del Proyecto</h3>
          <svg viewBox="0 0 600 400"
            class="w-full border border-slate-700 rounded bg-white p-2">
            <!-- Boundary of the project -->
            <rect x="20"
              y="20"
              width="560"
              height="360"
              fill="#f5f5f5"
              stroke="#8b7355"
              stroke-width="3" />

            <!-- Grid of parcels (5 columns x 4 rows) -->
            <g id="parcels">
              <rect v-for="parcel in parcels"
                :key="parcel.id"
                :x="parcel.x"
                :y="parcel.y"
                :width="parcel.width"
                :height="parcel.height"
                :fill="parcel.available ? '#10b981' : '#ef4444'"
                stroke="#1f2937"
                stroke-width="2"
                @click="selectParcel(parcel)"
                class="cursor-pointer hover:opacity-80 transition" />
            </g>

            <!-- Parcel labels -->
            <text v-for="parcel in parcels"
              :key="'label-' + parcel.id"
              :x="parcel.x + parcel.width / 2"
              :y="parcel.y + parcel.height / 2"
              text-anchor="middle"
              dominant-baseline="middle"
              class="text-xs font-bold"
              :fill="parcel.available ? '#ffffff' : '#ffffff'"
              pointer-events="none">
              {{ parcel.id }}
            </text>
          </svg>
          <div class="mt-4 flex gap-8 text-sm">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-emerald-500 rounded"></div>
              <span>Disponible</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-red-500 rounded"></div>
              <span>No Disponible</span>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="flex flex-col gap-6">
          <!-- IMAGE GALLERY -->
          <div class="bg-slate-800 border-2 border-slate-700 rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-3 text-emerald-400">Galería</h3>
            <div class="grid grid-cols-2 gap-3">
              <img v-for="i in 4"
                :key="i"
                :src="`/placeholder.svg?height=120&width=120&query=proyecto+residencial+${i}`"
                :alt="`Proyecto ${i}`"
                class="w-full h-28 object-cover rounded border border-slate-700 hover:border-emerald-500 transition cursor-pointer" />
            </div>
          </div>

          <!-- LOCATION MAP -->
          <div class="bg-slate-800 border-2 border-slate-700 rounded-lg overflow-hidden flex-1">
            <h3 class="text-lg font-semibold p-4 pb-0 text-emerald-400">Localización</h3>
            <iframe width="100%"
              height="250"
              style="border: 0; margin-top: 10px;"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3756.3547825!2d-72.6872!3d10.3888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5a1234567890ab%3A0x1234567890abcdef!2sProyecto%20Residencial!5e0!3m2!1ses!2sco!4v1234567890123"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="w-full"></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1e293b;
  }

  ::-webkit-scrollbar-thumb {
    background: #10b981;
    border-radius: 4px;
  }
</style>
