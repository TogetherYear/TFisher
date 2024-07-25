import { onMounted, onUnmounted } from "vue"
import { AActor } from "@/Libs/AActor"

class $0 extends AActor {
    public constructor() {
        super()
    }

    public InitStates() {
        return {

        }
    }

    public InitHooks() {

    }

    public Run() {
        onMounted(() => {

        })

        onUnmounted(() => {
            this.Destroy()
        })
    }

    public Destroy() {

    }
}

export { $0 }