import {
	connect,
	MapStateToProps,
	MapDispatchToProps,
} from 'react-redux'

// TStateProps TOwnProps State
// TDispatchProps
// @ts-ignore
export const connectComponent: <TStateProps, State, TDispatchProps, TOwnProps>(
	mapStateToProps: MapStateToProps<TStateProps, TOwnProps, State>,
	mapDispatchToProps: MapDispatchToProps<TDispatchProps, TOwnProps>
) => ClassDecorator = <TStateProps, TOwnProps, State, TDispatchProps>(
	mapStateToProps: MapStateToProps<TStateProps, TOwnProps, State>,
	mapDispatchToProps: MapDispatchToProps<TDispatchProps, TOwnProps>
) => (component: any) =>
	connect(
		mapStateToProps,
		mapDispatchToProps
  )(component as any)
  
