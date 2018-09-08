import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import { ComponentType } from 'react';
// import { ComponentType } from 'react';

// TStateProps TOwnProps State
// TDispatchProps
// @ts-ignore

export const connectComponent: <TStateProps, State, TDispatchProps, TOwnProps>(
	mapStateToProps: MapStateToProps<TStateProps, TOwnProps, State>,
	mapDispatchToProps: MapDispatchToProps<TDispatchProps, TOwnProps>
) => ClassDecorator = <TStateProps, TOwnProps, State, TDispatchProps>(
	mapStateToProps?: MapStateToProps<TStateProps, TOwnProps, State>,
	mapDispatchToProps?: MapDispatchToProps<TDispatchProps, TOwnProps>
) => (component: any) =>
	connect(
		mapStateToProps || (() => ({})), 
		mapDispatchToProps || (() => ({}))
	)(component as any)
	
/*
export const mapStateToProps = (
	mapStateToProps: MapStateToProps<any, any, any>,
	_options?: any
) => (target: ComponentType) => {
	debugger
	return connect(
		mapStateToProps,
		{}
	)(target)
}

export const mapDispatchToProps = (
	mapDispatchToProps: MapDispatchToProps<any, any>,
	_options?: any
) => <T>(target: T) => {
	debugger
	return connect<any>(
		() => ({}),
		mapDispatchToProps
	)(target as any)
}*/


export const myConnect = (mapStateToProps: MapStateToProps<any, any, any>, mapDispatchToProps: MapDispatchToProps<any, any>) => <T>(target: T & ComponentType): any => (props: any): T & ComponentType => {
	// @ts-ignore
	return new (connect<any>(
		mapStateToProps,
		mapDispatchToProps
	)(target as any))(props) as T
}