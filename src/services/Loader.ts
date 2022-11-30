interface LoaderRefInterface {
    open: any
    close: any
}

class LoaderService {
    loaderWrapperRef: LoaderRefInterface | null

    constructor() {
        this.loaderWrapperRef = null;
    }

    registerModal(ref: any) {
        this.loaderWrapperRef = ref;
    }

    open() {
        if (this.loaderWrapperRef) {
            this.loaderWrapperRef.open();
        }
    }

    close() {
        if (this.loaderWrapperRef) {
            this.loaderWrapperRef.close();
        }
    }
}

export default new LoaderService()
