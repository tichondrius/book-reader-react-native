import helloFlow from './helloworld';


export default function* rootSaga(){
  yield all([
    helloFlow(),
  ]);
}