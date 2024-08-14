import { onMounted, onUnmounted } from 'vue';
import { Component } from '@/Libs/Component';

class $0 extends Component {
    public constructor() {
        super();
    }

    public InitStates() {
        return {};
    }

    public Run() {
        onMounted(() => {});

        onUnmounted(() => {
            this.Destroy();
        });
    }

    public Destroy() {}
}

export { $0 };
