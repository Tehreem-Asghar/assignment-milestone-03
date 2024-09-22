
export async function fetchData <T>(url : string):Promise<T> {
    const res =await fetch(url)
    return res.json()
}